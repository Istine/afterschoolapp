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
import {
  checkForDups,
  checkForEmptyFields,
  getModuleDuration,
} from "@/lib/utils";
import { createModules } from "@/services/module";
import { LessonType, ModuleCreationType } from "@/types";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Loader2, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const { toast } = useToast();

  const router = useRouter();

  const [lessons, error, loading] = useLesson("/lesson");

  const path = "/module";

  const [moduleData, , isLoading, mutate] = useModule(path);

  const [modules, setModules] = React.useState<ModuleCreationType[]>([
    {
      module: "",
      lessons: [{ selected: false, lessonId: "" }],
    },
  ]);

  const [isSubmitting, setSubmitting] = React.useState(false);

  const addModule = (e: React.MouseEvent<HTMLDivElement>) => {
    setModules((prevState) => [
      ...prevState,
      {
        module: "",
        lessons: lessons.map((lesson: LessonType) => ({
          lessonId: lesson.id,
          selected: false,
        })),
      },
    ]);
  };

  const removeModule =
    (index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      const filteredModules = modules.filter(
        (module: ModuleCreationType, idx: number) => idx !== index
      );
      setModules(filteredModules);
    };

  const onChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setModules((prevState: ModuleCreationType[]) => {
        prevState[index].module = e.target.value;
        return [...prevState];
      });
    };

  const onChecked =
    (parentIndex: number, index: number = 0) =>
    (checkedState: CheckedState) => {
      setModules((prevState) => {
        prevState[parentIndex].lessons[index].selected =
          checkedState as boolean;
        return [...prevState];
      });
    };

  const onClick =
    (parentIndex: number, index: number, value: string) =>
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (modules[parentIndex].lessons[index].selected) {
        setModules((prevState) => {
          prevState[parentIndex].lessons[index].lessonId = value;
          return [...prevState];
        });
      }
    };

  React.useEffect(() => {
    if (lessons) {
      setModules((prevState) => {
        prevState.forEach((mod) => {
          mod.lessons = lessons.map((lesson: LessonType) => ({
            lessonId: lesson.id,
            selected: false,
          }));
        });
        return [...prevState];
      });
    }
  }, [lessons]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const [moduleCheck, lessonsCheck] = checkForEmptyFields(modules);

    if (moduleCheck.length) {
      toast({
        variant: "destructive",
        title: "create modules",
        description: `Please fill in all modules titles`,
      });
      return;
    }

    if (!lessonsCheck.length) {
      toast({
        variant: "destructive",
        title: "create modules",
        description: `You have to select at least one lesson for a module`,
      });
      return;
    }

    const dups = checkForDups(moduleData, modules);
    if (dups.length) {
      toast({
        variant: "destructive",
        title: "create modules",
        description: `${dups.join(",")} already exist`,
      });
      return;
    }
    setSubmitting(true);
    const parsedModules = modules.map((m) => ({
      title: m.module,
      duration: getModuleDuration(
        { title: m.module, lessons: m.lessons.map((l) => l.lessonId) },
        lessons
      ),
      lessons: m.lessons.filter((l) => l.selected).map((l) => l.lessonId),
    }));
    const [data, error] = await createModules(parsedModules);
    if (error) {
      toast({
        variant: "destructive",
        title: "create modules",
        description: "error creating modules",
      });
      return;
    }
    toast({
      title: "create modules",
      description: `Successfully created ${modules.length} module${
        modules.length > 1 ? "s" : ""
      }`,
    });
    router.push("/admin/account/modules");
    setSubmitting(false);
  };

  const selectedLessons = modules.map((m) =>
    m.lessons.filter((l) => l.selected).map((l) => l.lessonId)
  );

  if (loading)
    return (
      <Loader2
        size={30}
        color="gray"
        className="animate-spin absolute top-1/2 left-1/2"
      />
    );

  return (
    <div className="w-full p-5 mb-10">
      <h2 className="font-sans text-2xl font-bold">Create Modules</h2>
      <form onSubmit={onSubmit}>
        {modules.map((module, idx) => (
          <div key={idx} className="w-2/3 my-7">
            <div className="w-full flex items-center h-[30px]">
              <Input
                className="h-full mr-2"
                type="text"
                onChange={onChange(idx)}
                value={module.module}
                placeholder="module name..."
              />
            </div>
            <div className="w-full flex justify-between items-center h-[30px] mt-4">
              <Select>
                <SelectTrigger className="w-2/3 h-full">
                  <SelectValue
                    placeholder={
                      selectedLessons[idx].length
                        ? `${selectedLessons[idx].length} lesson${
                            selectedLessons[idx].length > 1 ? "s" : ""
                          } selected`
                        : "Select Lessons"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="min-h-[100px] max-h-[250px]">
                  <SelectGroup>
                    <SelectLabel>Lessons</SelectLabel>
                    {lessons.map((lesson: LessonType, index: number) => (
                      <div
                        key={lesson.id}
                        className="w-full cursor-pointer flex items-center h-full p-2 duration-300 ease-in-out hover:bg-gray-200"
                      >
                        <Checkbox
                          checked={modules[idx].lessons[index]?.selected}
                          onCheckedChange={onChecked(idx, index)}
                          value={lesson.id}
                          onClick={onClick(idx, index, lesson.id)}
                        />
                        <span className="mx-2 text-sm">{lesson.title}</span>
                      </div>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {idx > 0 ? (
                <div
                  onClick={removeModule(idx)}
                  className="group cursor-pointer p-1 rounded-md bg-gray-300 duration-300 ease-in hover:bg-violet-400"
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
                        <p>Remove Module</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
        <div className="w-2/3 flex items-center justify-between mt-4">
          <Button type="submit">
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <span>Submit</span>
            )}
          </Button>
          <div
            onClick={addModule}
            className="group w-[34px] cursor-pointer p-1 rounded-md bg-gray-300 duration-300 ease-in hover:bg-violet-400"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Plus
                    size={25}
                    className="cursor-pointer duration-300 ease-in group-hover:stroke-white"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add Module</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
