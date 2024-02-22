"use client";

import SelectContainer from "@/components/ui/SelectContainerUpdate";
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
import { useCourse } from "@/hooks/useCourse";
import { useInstructor } from "@/hooks/useInstructor";
import { useModule } from "@/hooks/useModule";
import {
  formatByInstructorFullNameAndId,
  formatModulesByTitle,
  getCourseDuration,
} from "@/lib/utils";
import { updateCourseById } from "@/services/course";
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
  thumbnail: "",
  category: "",
};

const Page = ({ params }: { params: { slug: string } }) => {
  const path = `/course/${params.slug}`;

  const [data, , dataLoading, mutate] = useCourse(path);

  const [allInstructors = [], error, loading] = useInstructor("/instructor");

  const [modules = [], modulesLoading] = useModule("/module");

  const { toast } = useToast();
  const router = useRouter();

  const [, , , , setProgress] = useAppLoader();

  const trailer = React.useRef(null) as any;
  const thumbnail = React.useRef(null) as any;

  const [form, setForm] = React.useState<CourseCreationType>(defaultValues);

  const [files, setFile] = React.useState<{ thumbnail: Blob; file: Blob }>({
    file: new Blob(),
    thumbnail: new Blob(),
  } as { thumbnail: Blob; file: Blob });

  const [localLoadState, setLocalLoadState] = React.useState(false);

  const instructors = formatByInstructorFullNameAndId(allInstructors);

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

  const filename = data
    ? data.videoTrailerUrl.split("/")[
        data.videoTrailerUrl.split("/").length - 1
      ]
    : null;

  const thumbnailFilename = data
    ? data.thumbnail.split("/")[data.thumbnail.split("/").length - 1]
    : null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const options: { file: any; thumbnail: any } = {
      file: undefined,
      thumbnail: null,
    };
    let asset = files.file as File;

    if ((files.file as File).name) {
      options.file = {
        filename: asset.name,
        contentType: asset.type,
        setProgress,
        blob: asset,
      };
    }
    asset = files.thumbnail as File;
    if ((files.thumbnail as File).name) {
      options.thumbnail = {
        filename: asset.name,
        contentType: asset.type,
        setProgress,
        blob: asset,
      };
    }
    if (options.file || options.thumbnail) {
      setProgress((prev: any) => ({
        ...prev,
        isVisible: true,
        state: "updated",
      }));
    } else if (!options.file && !options.thumbnail) {
      setLocalLoadState(true);
    }
    const [, error] = await updateCourseById(
      form,
      options.file,
      options.thumbnail
    );
    if (error) {
      toast({
        variant: "destructive",
        title: "course creation",
        description: "courses creation failed",
      });
    } else {
      toast({
        title: "course update",
        description: "courses update successfull",
      });
      mutate(path);
    }
    if (options.file || options.thumbnail) {
      setProgress((prev: any) => ({
        ...prev,
        isVisible: false,
        state: "created",
      }));
    } else if (!options.file && !options.thumbnail) {
      setLocalLoadState(false);
    }
  };

  React.useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  if (loading && modulesLoading && dataLoading)
    return <Loader2 size={30} color="gray" className="animate-spin" />;

  return (
    <div className="w-full grid grid-cols-3  py-4 px-6">
      <form onSubmit={onSubmit} className="col-span-2">
        <h2 className="my-4 text-gray-700 font-bold text-xl">Update course</h2>
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
            id="category"
            value={form.category}
            onChange={handleChange}
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
            {thumbnailFilename && !(files.thumbnail as File).name
              ? thumbnailFilename
              : (files.thumbnail as File).name}
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
            {filename && !(files.file as File).name
              ? filename
              : (files.file as File).name}
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
            defaultValues={form.language}
          />
          <div className="w-full my-4">
            <SelectContainer
              onSelect={onSelect}
              title="Modules"
              target="modules"
              placeholder="select modules"
              data={allModules}
              refData={modules}
              defaultValues={form.modules}
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
            defaultValues={form.teachers}
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
          {localLoadState ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <span>Save Changes</span>
          )}
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

export default Page;
