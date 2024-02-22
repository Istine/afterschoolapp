"use client";

import { getInstructors } from "@/services/instructors";
import useSWR, { mutate } from "swr";

export const useInstructor = (path: string) => {
  const { data, error, isLoading } = useSWR(path, getInstructors);
  return [data, error, isLoading, mutate];
};
