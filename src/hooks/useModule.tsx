"use client";

import { getModules } from "@/services/module";
import useSWR, { mutate } from "swr";

export const useModule = (path: string) => {
  const { data, error, isLoading } = useSWR(path, getModules);
  return [data, error, isLoading, mutate];
};
