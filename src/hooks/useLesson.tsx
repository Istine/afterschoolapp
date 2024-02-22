"use client";

import { getLessons } from "@/services/lesson";
import useSWR, { mutate } from "swr";

export const useLesson = (path: string) => {
  const { data, error, isLoading } = useSWR(path, getLessons);
  return [data, error, isLoading, mutate];
};
