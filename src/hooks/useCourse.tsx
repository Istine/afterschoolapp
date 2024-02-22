"use client";

import { getCourses } from "@/services/course";
import useSWR, { mutate } from "swr";

export const useCourse = (path: string) => {
  const { data, error, isLoading } = useSWR(path, getCourses);
  return [data, error, isLoading, mutate];
};
