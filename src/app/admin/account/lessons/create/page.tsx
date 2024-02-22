"use client";

import Lesson from "@/components/pages/Lesson";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "@/hooks/useRouter";
import { createLessons, uploadVideo } from "@/services/lesson";
import { LessonFormType } from "@/types";
import React from "react";

const Page = () => {
  const [router] = useRouter();

  const { toast } = useToast();

  const [form, setForm] = React.useState<Array<LessonFormType>>([]);

  const [files, setFiles] = React.useState<FileList>();

  const [progress, setProgress] = React.useState<Array<number>>([]);

  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    const calls = [];
    const passed = [];
    const myfiles = files as FileList;
    for (let index = 0; index < myfiles.length; index++) {
      const element = myfiles[index];
      calls.push(
        uploadVideo(element.name, element.type, element, setProgress, index)
      );
    }
    const results = await Promise.allSettled(calls);
    for (const result of results) {
      if (result.status === "fulfilled") {
        const lesson = {
          ...form[result.value.index],
          videoUrl: result.value.key,
        };
        passed.push(lesson);
      }
    }

    const [, error] = await createLessons(passed);
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

      router.push("/admin/account/lessons");
    }
    setLoading(false);
  };

  React.useEffect(() => {
    const arr = new Array(files?.length);
    arr.fill(0);
    setProgress(arr);
  }, [files]);

  return (
    <Lesson
      pageTitle="Create  New Lesson"
      form={form}
      onSubmit={onSubmit}
      setFiles={setFiles}
      setForm={setForm}
      files={files as FileList}
      progress={progress}
      loading={loading}
      setProgress={setProgress}
      multiple={true}
    />
  );
};

export default Page;
