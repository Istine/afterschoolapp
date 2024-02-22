import {
  InstructorType,
  LessonType,
  ModuleCreationType,
  ModuleType,
} from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCount = (count: number) => {
  if (count > 1000) {
    return `${count}K`;
  }
  return count;
};

export const parseVideoMetaData = async (files: FileList) => {
  const videoDataArray = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);

    const data = await new Promise((resolve) => {
      video.onloadedmetadata = () => {
        const metadata = {
          title: file.name,
          duration: formatDuration(video.duration),
          description: `${file.name}-${video.duration}`,
        };
        URL.revokeObjectURL(video.src);
        resolve(metadata);
      };
    });

    videoDataArray.push(data);
  }

  return videoDataArray;
};

function formatDuration(duration: number) {
  const minutes = Math.floor(duration / 60);
  const hours = Math.floor(minutes / 60);
  const seconds = Math.floor(duration % 60);
  return `${hours}:${minutes}:${seconds}`;
}

export const filterVideoFilesByIndex = (files: FileList, idx: number) => {
  const newArr = [];
  for (let index = 0; index < files.length; index++) {
    const element = files[index];
    if (idx !== index) {
      newArr.push(element);
    }
  }
  return newArr;
};

export const formatTime = (time: number) => {
  //formarting duration of video
  if (isNaN(time)) {
    return "00:00";
  }

  const date = new Date(time * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  if (hours) {
    //if video have hours
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds}`;
  } else return `${seconds.toString().padStart(2, "0")}`;
};

export const checkForDups = (
  dbModules: ModuleType[],
  modules: ModuleCreationType[]
) => {
  const checks = [];
  const lessonTitles = dbModules.map((l: ModuleType) => l.title);

  for (const mod of dbModules) {
    for (const m of modules) {
      if (m.module === mod.title) {
        checks.push(m.module);
      }
    }
  }

  return checks;
};

export const checkForEmptyFields = (modules: ModuleCreationType[]) => {
  const checks = [];
  let lessonsCheck: any = [];
  for (const m of modules) {
    if (!m.module) {
      checks.push(m.module);
    }
    const selected = m.lessons.filter((l) => l.selected);
    lessonsCheck = [...selected];
  }

  return [checks, lessonsCheck];
};

const formatByInstructorFullName = (instructors: InstructorType[] = []) => {
  return instructors.map(
    (instructor: InstructorType) =>
      `${instructor.firstName} ${instructor.lastName}`
  );
};

export const formatByInstructorFullNameAndId = (
  instructors: InstructorType[] = []
) => {
  return instructors.map((instructor: InstructorType) => ({
    title: `${instructor.firstName} ${instructor.lastName}`,
    id: instructor.id,
  }));
};

export const formatModulesByTitle = (modules: ModuleType[]) => {
  return modules.map((m) => m.title);
};

export const getCourseDuration = (
  module: string[] = [],
  modules: Array<{ id: string; duration: string }>
) => {
  let hour = 0,
    minute = 0,
    second = 0;
  for (const id of module) {
    if (modules.map((m) => m.id).includes(id)) {
      const target = modules.find((value) => value.id === id);
      const [hours, minutes, seconds] = target?.duration.split(":") as string[];
      hour += +hours;
      minute += +minutes;
      second += +seconds;
    }
  }

  const minutesFromSeconds = Math.floor(second / 60);
  const remainderSecs = second % 60;
  minute += minutesFromSeconds;
  const hoursFromMins = Math.floor(minute / 60);
  hour += hoursFromMins;
  let remainderMins = minute % 60;

  return `${hour}:${remainderMins}:${remainderSecs}`;
};

export const getModuleDuration = (
  module: ModuleType,
  lessons: LessonType[]
) => {
  const dbLessonIds = lessons.map((l: LessonType) => l.id);
  let hour = 0;
  let minute = 0;
  let second = 0;
  for (const id of module.lessons) {
    if (dbLessonIds.includes(id)) {
      const target = lessons.find((value: LessonType) => value.id === id);
      const [hours, minutes, seconds] = target?.duration.split(":") as string[];
      hour += +hours;
      minute += +minutes;
      second += +seconds;
    }
  }

  const minutesFromSeconds = Math.floor(second / 60);
  const remainderSecs = second % 60;
  minute += minutesFromSeconds;
  const hoursFromMins = Math.floor(minute / 60);
  hour += hoursFromMins;
  let remainderMins = minute % 60;

  return `${hour}:${remainderMins}:${remainderSecs}`;
};
