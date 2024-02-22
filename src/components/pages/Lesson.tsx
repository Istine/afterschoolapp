"use client";

import { Button } from "../ui/button";
import React from "react";
import { LessonFormType } from "@/types";
import { filterVideoFilesByIndex, parseVideoMetaData } from "@/lib/utils";
import { Clock9, Loader2, Video, X, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Page = ({
  pageTitle,
  onSubmit,
  form,
  setFiles,
  setForm,
  files,
  progress,
  setProgress,
  loading,
  multiple,
}: {
  form: Array<LessonFormType>;
  pageTitle: string;
  onSubmit: any;
  setFiles: any;
  setForm: any;
  progress: Array<number>;
  files: FileList;
  loading: boolean;
  setProgress: any;
  multiple?: boolean;
}) => {
  const ref = React.useRef() as any;

  return (
    <div className="w-full flex flex-col py-4 px-6 mb-4">
      <h2 className="mb-6 font-bold text-2xl">{pageTitle}</h2>
      <form>
        <div className="w-full flex flex-col ">
          <input
            type="file"
            className="hidden"
            multiple={multiple}
            ref={ref}
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              const { files } = e.target;
              setFiles(files);
              const data = await parseVideoMetaData(files as FileList);
              setForm(data);
            }}
          />
          <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              ref.current.click();
            }}
            className="w-1/4 bg-[#fff]"
            variant="outline"
          >
            upload lesson videos
          </Button>
        </div>
      </form>
      <div className="w-full p-3">
        {form.map((obj: LessonFormType, idx: number) => (
          <div key={idx}>
            <div className="w-2/3 flex items-center font-sans my-1">
              <Progress
                value={progress[idx]}
                className="w-full"
                color="violet"
              />
              {progress[idx] ? (
                <div className="flex items-center">
                  <span className="text-foreground font-sans text-md">
                    {progress[idx]}%
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="w-full flex font-sans my-1">
              <div className="w-3/4 truncate flex bg-background items-center p-2 text-foreground rounded-[10px] border border-solid border-b-1 border-e1e6f0">
                <Video color="violet" size={30} />
                <span className="text-md ml-2">{obj.title}</span>
              </div>
              <div className="w-1/6 flex bg-background items-center p-2 text-foreground rounded-[10px] border border-solid border-b-1 border-e1e6f0">
                <Clock9 color="violet" size={20} />
                <span className="text-md ml-2">{obj.duration}</span>
              </div>
              <div
                className="flex items-center cursor-pointer"
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  const filteredVideos = form.filter((val, n) => n !== idx);
                  setForm(filteredVideos);
                  setFiles(filterVideoFilesByIndex(files, idx));
                  const progressFiltered = progress.filter((p, i) => i !== idx);
                  setProgress(progressFiltered);
                }}
              >
                <XCircle color="violet" size={20} />
              </div>
            </div>
          </div>
        ))}
        {form.length === 0 && (
          <p className="px-2 font-sans text-foreground my-4">
            No files selected
          </p>
        )}
      </div>
      <div className="grid w-full gap-1.5">
        <Button
          className="w-1/4 mt-4"
          type="submit"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Page;
