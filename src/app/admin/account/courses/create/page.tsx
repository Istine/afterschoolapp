"use client";

import SelectContainer from "@/components/ui/SelectContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { LANGUAGES } from "@/constants";
import { useAppLoader } from "@/context/courseLoaderContext";
import { useInstructor } from "@/hooks/useInstructor";
import { useModule } from "@/hooks/useModule";
import {
  formatByInstructorFullNameAndId,
  formatModulesByTitle,
  getCourseDuration,
} from "@/lib/utils";
import { createCourse } from "@/services/course";
import { CourseCreationType } from "@/types";
import {
  InfinityIcon,
  Loader2,
  Minus,
  Plus,
  Timer,
  Trophy,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const defaultValues: CourseCreationType = {
  title: "",
  description: "",
  price: "",
  duration: "",
  courseObjectives: [],
  modules: [],
  teachers: [],
  language: [],
  videoTrailerUrl: "",
  category: "",
  thumbnail: "",
};

const CreateCourse = () => {
  const [data = [], error, loading] = useInstructor("/instructor");

  const [modules = [], modulesLoading] = useModule("/module");

  const { toast } = useToast();
  const router = useRouter();

  const [, , , , setProgress] = useAppLoader();

  const trailer = React.useRef(null) as any;

  const thumbnail = React.useRef(null) as any;

  const [form, setForm] = React.useState<CourseCreationType>(defaultValues);

  const [files, setFile] = React.useState<{ thumbnail: Blob; file: Blob }>(
    {} as { thumbnail: Blob; file: Blob }
  );

  const instructors = formatByInstructorFullNameAndId(data);

  const allModules = formatModulesByTitle(modules);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevState: CourseCreationType) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSelect = (
    state: string[],
    target: "language" | "teachers" | "modules"
  ) => {
    setForm((prevState: CourseCreationType) => ({
      ...prevState,
      [target]: state,
    }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    const name = e.target.name;

    setFile((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const addObjective = (e: React.MouseEvent<HTMLDivElement>) => {
    setForm((prevState) => ({
      ...prevState,
      courseObjectives: [...prevState.courseObjectives, ""],
    }));
  };

  const removeObjective =
    (index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      const filtered = form.courseObjectives.filter((c, i) => i !== index);
      setForm((prevState) => ({
        ...prevState,
        courseObjectives: filtered,
      }));
    };

  const onAddCourseObjective =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prevState: CourseCreationType) => {
        prevState.courseObjectives[index] = e.target.value;
        return { ...prevState };
      });
    };

  const courseDuration = getCourseDuration(form.modules, modules);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProgress((prev: any) => ({ ...prev, isVisible: true }));
    const asset = files.file as File;
    const [, error] = await createCourse(
      asset.name,
      asset.type,
      files.file,
      { ...form, duration: courseDuration },
      setProgress,
      files.thumbnail
    );
    if (error) {
      toast({
        variant: "destructive",
        title: "lesson creation",
        description: "lessons creation failed",
      });
    } else {
      toast({
        title: "lesson creation",
        description: "lessons creation successfull",
      });
      router.push("/admin/account/courses");
    }
    setProgress((prev: any) => ({ ...prev, isVisible: false, progress: 0 }));
  };

  if (loading && modulesLoading)
    return <Loader2 size={20} color="gray" className="animate-spin" />;

  return (
    <div className="w-full grid grid-cols-3  py-4 px-6">
      <form onSubmit={onSubmit} className="col-span-2">
        <h2 className="my-4 text-gray-700 font-bold text-xl">Create course</h2>
        <div className="w-full my-4">
          <Input
            className="h-[30px]"
            name="title"
            value={form.title}
            onChange={handleChange}
            id="title"
            placeholder="title..."
          />
        </div>
        <div className="w-full my-4">
          <Input
            className="h-[30px]"
            name="price"
            id="price"
            value={form.price}
            onChange={handleChange}
            placeholder="price..."
          />
        </div>
        <div className="w-full my-4">
          <Input
            className="h-[30px]"
            name="category"
            value={form.category}
            onChange={handleChange}
            id="category"
            placeholder="category..."
          />
        </div>
        <div className="w-full flex items-center my-4">
          <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              thumbnail.current.click();
            }}
            className="h-[30px] bg-[#fff]"
            variant="outline"
          >
            select course thumbnail
          </Button>
          <p className="text-gray-700 font-sans text-sm py-3 mx-2 w-full truncate">
            {(files.thumbnail as File)?.name}
          </p>
          <Input
            type="file"
            name="thumbnail"
            onChange={onFileChange}
            ref={thumbnail}
            className="h-[30px] hidden"
          />
        </div>
        <div className="w-full flex items-center my-4">
          <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              trailer.current.click();
            }}
            className="h-[30px] bg-[#fff]"
            variant="outline"
          >
            select course trailer
          </Button>
          <p className="text-gray-700 font-sans text-sm py-3 mx-2 w-full truncate">
            {(files.file as File)?.name}
          </p>
          <Input
            type="file"
            name="file"
            onChange={onFileChange}
            ref={trailer}
            className="h-[30px] hidden"
          />
        </div>

        <div className="w-full my-4">
          <Textarea
            onChange={handleChange}
            className="min-h-[12em]"
            name="description"
            value={form.description}
            id="description"
            placeholder="course description..."
            minLength={10}
          />
        </div>
        <div className="w-full my-4">
          <SelectContainer
            onSelect={onSelect}
            title="Languages"
            target="language"
            placeholder="select languages"
            data={LANGUAGES}
          />
          <div className="w-full my-4">
            <SelectContainer
              onSelect={onSelect}
              title="Modules"
              target="modules"
              placeholder="select modules"
              data={allModules}
              refData={modules}
            />
          </div>
        </div>
        <div className="w-full my-4">
          <SelectContainer
            onSelect={onSelect}
            title="Instructors"
            target="teachers"
            placeholder="select instructors"
            data={[]}
            refData={instructors}
          />
        </div>
        <div className="w-full my-4">
          {form.courseObjectives.length ? (
            <h2 className="font-sans text-gray-600 text-md mb-4">
              Course Objectives
            </h2>
          ) : (
            ""
          )}
          {form.courseObjectives.map(
            (courseObjective: string, index: number) => (
              <div key={index} className="w-full mb-4 flex items-center">
                <Input
                  value={form.courseObjectives[index]}
                  onChange={onAddCourseObjective(index)}
                  className="h-[30px]  w-2/3"
                  name="objective"
                  id="objective"
                  placeholder="type objective..."
                />
                <div
                  onClick={removeObjective(index)}
                  className="group ml-2 w-[34px] cursor-pointer p-1 rounded-md bg-gray-300 duration-300 ease-in hover:bg-violet-400"
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
                        <p>remove</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            )
          )}
          <div
            onClick={addObjective}
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
                  <p>add </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {!form.courseObjectives.length ? (
            <p className="text-gray-500 font-sans text-sm py-3">
              Click to add course objectives
            </p>
          ) : (
            ""
          )}
        </div>
        <Button type="submit">
          <span>Submit</span>
        </Button>
      </form>
      <div className="w-full px-4 mt-[60px] h-[100px] col-span-1">
        <div className="w-full ">
          <h2 className="font-bold text-gray-700 font-sans mb-2">
            This course will include:
          </h2>
          <div className="flex items-center  mb-4">
            <Timer size={20} className="stroke-gray-500" />
            <span className="ml-2 text-sm text-gray-900">
              {courseDuration} hours on-demand video
            </span>
          </div>
          <div className="flex items-center  mb-4">
            <InfinityIcon size={20} className="stroke-gray-500" />
            <span className="ml-2 text-sm text-gray-900">
              Full lifetime access
            </span>
          </div>
          <div className="flex items-center mb-4">
            <Trophy size={20} className="stroke-gray-500" />
            <span className="ml-2 text-sm text-gray-900">
              Certificate of completion
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
