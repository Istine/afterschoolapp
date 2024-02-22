"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { useLesson } from "@/hooks/useLesson";
import { useModule } from "@/hooks/useModule";
import { updateModuleById } from "@/services/module";
import { LessonType, ModuleType } from "@/types";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Loader2, Minus } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = ({ params }: { params: { slug: string } }) => {
  const { toast } = useToast();

  const path = `/module/${params.slug}`;
  const [data, error, loading, mutate] = useModule(path);
  const lessonPath = "/lesson";
  const [lessons, , lessonLoading, mutateLesson] = useLesson(lessonPath);

  const [allLessons, setAllLessons] = React.useState([] as LessonType[]);

  const [selectedLessons, setLessons] = React.useState([] as string[]);

  const [module, setModule] = React.useState("");

  const [updateLoading, setUpdateLoading] = React.useState(false);

  const onChecked = (id: string) => (value: CheckedState) => {
    if (value) {
      setLessons((prevState) => {
        return Array.from(new Set([...prevState, id]));
      });
    } else {
      const filtered = selectedLessons.filter((val) => val !== id);
      setLessons(filtered);
    }
  };

  const removeLesson =
    (id: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      const filtered = selectedLessons.filter((val, idx) => val !== id);
      setLessons(filtered);
      const fromDBFilter = selectedLessons.filter((val, idx) => val == id);
      if (!fromDBFilter.length) {
        const afterDBEntryRemoved = allLessons.filter(
          (lesson: LessonType) => lesson.id !== id
        );
        setAllLessons(afterDBEntryRemoved);
      }
    };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModule(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUpdateLoading(true);
    const requestBody = {
      title: module,
      lessons: selectedLessons,
      id: params.slug,
    };

    const [updated, error] = await updateModuleById(requestBody);
    if (error) {
      toast({
        variant: "destructive",
        title: "module updated",
        description: `error updating module`,
      });
    } else {
      toast({
        title: "module updated",
        description: `module updated successfully`,
      });
      mutate(path);
      mutateLesson(lessonPath);
    }
    setUpdateLoading(false);
  };

  React.useEffect(() => {
    if (data && lessons) {
      const addedLessons = (lessons ? lessons : [])
        .filter((lesson: LessonType) => selectedLessons.includes(lesson.id))
        .map((lesson: LessonType) => {
          return lesson;
        });
      const all = [...addedLessons];
      setAllLessons(all);
    }
  }, [data, lessons, selectedLessons]);

  React.useEffect(() => {
    if (data && lessons) {
      const ids = data.lessons.map((lesson: LessonType) => lesson.id);
      setLessons(ids);
      setModule(data.title);
    }
  }, [data, lessons]);

  if (loading && lessonLoading)
    return (
      <Loader2
        size={30}
        color="gray"
        className="animate-spin absolute top-1/2 left-1/2"
      />
    );

  return (
    <div className="w-full mt-4">
      <form onSubmit={onSubmit} className="w-2/3  mt-4">
        <h2 className="font-sans text-xl my-2 font-bold text-gray-700">
          Module Name
        </h2>
        <div className="w-full flex items-center h-[30px]  my-4">
          <Input
            className="w-full h-full py-2 px-2 bg-white text-sm my-2 rounded-md"
            type="text"
            onChange={onChange}
            value={module}
            placeholder="module name..."
          />
        </div>
        <div className="w-full  h-[30px]">
          <Select>
            <SelectTrigger className="w-2/3 h-full">
              <SelectValue
                placeholder={
                  selectedLessons.length
                    ? `${selectedLessons.length} lesson added${
                        selectedLessons.length > 1 ? "s" : ""
                      } selected`
                    : "Add More Lessons"
                }
              />
            </SelectTrigger>
            <SelectContent
              position="popper"
              className="min-h-[100px] max-h-[250px]"
            >
              <SelectGroup>
                <SelectLabel>Lessons</SelectLabel>
                {(lessons || [])
                  .filter(
                    (lesson: LessonType) =>
                      !data?.lessons
                        .map((l: LessonType) => l.id)
                        .includes(lesson.id)
                  )
                  .map((lesson: LessonType, index: number) => (
                    <div
                      key={lesson.id}
                      className="w-full cursor-pointer flex items-center h-full p-2 duration-300 ease-in-out hover:bg-gray-200"
                    >
                      <Checkbox
                        checked={selectedLessons.includes(lesson.id)}
                        onCheckedChange={onChecked(lesson.id)}
                        value={lesson.id}
                      />
                      <span className="mx-2 text-sm">{lesson.title}</span>
                    </div>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <h2 className="font-sans text-xl my-2 font-bold text-gray-700 ">
          Lessons
        </h2>
        {allLessons.map((lesson: LessonType) => (
          <div
            key={lesson.id}
            className="w-full flex justify-between items-center"
          >
            <Link
              className="w-full"
              href={`/admin/account/lessons/${lesson.id}`}
            >
              <div className="w-full py-2 px-2 bg-white text-sm my-2 rounded-md">
                {lesson.title}
              </div>
            </Link>
            <div
              onClick={removeLesson(lesson.id)}
              className="group w-[34px] cursor-pointer p-1 rounded-md bg-gray-300 duration-300 ease-in hover:bg-violet-400"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Minus
                      size={25}
                      className="cursor-pointer duration-300 ease-in group-hover:stroke-white"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remove Lesson</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        ))}
        <Button
          disabled={
            data?.lessons.length === selectedLessons.length &&
            data?.title === module
          }
          type="submit"
        >
          {updateLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default Page;
