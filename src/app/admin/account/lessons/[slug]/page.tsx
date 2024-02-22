"use client";

import ReactPlayer from "react-player";
import { useLesson } from "@/hooks/useLesson";
import Controls from "@/components/ui/Controls";
import React from "react";
import { LessonFormType, VideoStateType } from "@/types";
import { OnProgressProps } from "react-player/base";
import { formatTime } from "@/lib/utils";
import screenFull from "screenfull";
import { Loader2, Pause, Play } from "lucide-react";
import Lesson from "@/components/pages/Lesson";
import { useToast } from "@/components/ui/use-toast";
import { createLesson, uploadVideo } from "@/services/lesson";
import { useRouter } from "next/navigation";

const EditLesson = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();

  const path = `/lesson/${params.slug}`;
  const [lesson, error, loading, mutate] = useLesson(path);

  const [isVisible, setIsVisible] = React.useState(false);

  const ref = React.useRef() as any;

  const [videoState, setVideoState] = React.useState<VideoStateType>({
    playBackRate: 1,
    volume: 0.4,
  } as VideoStateType);

  const { play, muted, seeking, played, playBackRate, volume, buffer } =
    videoState;

  const { toast } = useToast();

  const [form, setForm] = React.useState<LessonFormType[]>([]);

  const [files, setFiles] = React.useState<FileList>();

  const [progress, setProgress] = React.useState<number[]>([0]);

  const [isLoading, setLoading] = React.useState<boolean>(false);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    const myfiles = files as FileList;
    const element = myfiles[0];

    const result = await uploadVideo(
      element.name,
      element.type,
      element,
      setProgress,
      0
    );

    const lesson = {
      ...form[0],
      videoUrl: result.key,
    };

    const [, error] = await createLesson(params.slug, lesson);
    if (error) {
      toast({
        variant: "destructive",
        title: "lesson creation",
        description: "lessons creation failed",
      });
    } else {
      toast({
        variant: "default",
        title: "lesson creation",
        description: "lessons created",
      });
      setFiles([] as unknown as FileList);
      setForm([]);
      setProgress([0]);
      mutate(path);
    }
    setLoading(false);
  };

  const isPlayingHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    setVideoState((prevState: VideoStateType) => ({
      ...prevState,
      play: !prevState.play,
    }));
  };

  const fastForwardHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    ref.current.seekTo(ref.current.getCurrentTime() + 5);
  };

  const rewindHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    ref.current.seekTo(ref.current.getCurrentTime() - 5);
  };

  const progressHandler = (state: OnProgressProps) => {
    if (!seeking) {
      setVideoState({ ...videoState, ...state });
    }
  };

  const seekHandler = (value: string) => {
    setVideoState({
      ...videoState,
      seeking: true,
      played: parseFloat(value) / 100,
    });
    ref.current.seekTo(Number(value) / 100);
  };

  const seekMouseUpHandler = (value: number) => {
    setVideoState({ ...videoState, seeking: false });
  };

  const playBackRateHandler = React.useCallback(
    (playRate: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      setVideoState((prevState) => ({
        ...prevState,
        playBackRate: playRate,
      }));
    },
    []
  );

  const toggleVolume = (e: React.MouseEvent<HTMLSpanElement>) => {
    setVideoState((prevState) => ({
      ...prevState,
      muted: !prevState.muted,
    }));
  };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.valueAsNumber + "") / 100;
    setVideoState((prevState) => ({
      ...prevState,
      volume: newVolume,
    }));
  };

  const makeFullScreen = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (screenFull.isEnabled && ref.current.getInternalPlayer()) {
      screenFull.request(ref.current.getInternalPlayer());
    }
  };

  const onTogglePlayAndPause = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 200);

    setVideoState((prevState) => ({
      ...prevState,
      play: !prevState.play,
    }));
  };

  const onBuffer = () => {
    setVideoState((prevState) => ({ ...prevState, buffer: true }));
  };

  const onBufferEnd = () => {
    setVideoState((prevState) => ({ ...prevState, buffer: false }));
  };

  const currentTime = ref.current
    ? formatTime(ref.current.getCurrentTime())
    : "00:00";

  const duration = ref.current
    ? formatTime(ref.current.getDuration())
    : "00:00";

  if (loading)
    return (
      <Loader2
        size={30}
        color="gray"
        className="animate-spin absolute top-1/2 left-1/2"
      />
    );

  return (
    <div className="w-full">
      <p className="my-2">
        <span>Lesson Title: </span>
        <span>{lesson.title}</span>
      </p>
      <div className="w-full relative h-full group bg-[#000000]">
        <ReactPlayer
          ref={ref}
          url={lesson.videoUrl}
          width="100%"
          height={500}
          playing={play}
          muted={muted}
          playbackRate={playBackRate}
          onProgress={progressHandler}
          className="w-full"
          volume={volume}
          onBuffer={onBuffer}
          onBufferEnd={onBufferEnd}
        />
        <div
          className={` top-0 absolute w-full h-full bg-transparent`}
          onClick={onTogglePlayAndPause}
        >
          {buffer ? (
            <Loader2
              size={100}
              color="gray"
              className="animate-spin absolute top-1/2 left-1/2"
            />
          ) : (
            ""
          )}
          {!play ? (
            <Pause
              className={`transition-opacity ease ${
                isVisible ? "opacity-100" : "opacity-0"
              } absolute fill-slate-700 stroke-slate-700 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
              size={70}
            />
          ) : (
            <Play
              className={`transition-opacity ${
                isVisible ? "opacity-100" : "opacity-0"
              } absolute fill-slate-700 stroke-slate-700 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
              size={70}
            />
          )}
        </div>
        <Controls
          setPlay={isPlayingHandler}
          play={play}
          onForward={fastForwardHandler}
          onRewind={rewindHandler}
          played={played}
          onSeek={seekHandler}
          onSeekUp={seekMouseUpHandler}
          currentTime={currentTime}
          duration={duration}
          playBackRateHandler={playBackRateHandler}
          playBackRate={playBackRate}
          toggleVolume={toggleVolume}
          muted={muted}
          onVolumeChange={onVolumeChange}
          volume={volume}
          makeFullScreen={makeFullScreen}
          app={"admin"}
        />
      </div>
      <div className="mt-4">
        <Lesson
          form={form}
          pageTitle="Update Lesson"
          onSubmit={onSubmit}
          setFiles={setFiles}
          setForm={setForm}
          progress={progress}
          files={files as FileList}
          loading={isLoading}
          setProgress={setProgress}
          multiple={false}
        />
      </div>
    </div>
  );
};

export default EditLesson;
