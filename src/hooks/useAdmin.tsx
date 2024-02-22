"use client";

import { getAdmin } from "@/services/admin";
import useSWR, { mutate } from "swr";

export const useAdmin = (path: string) => {
  const { data, error, isLoading } = useSWR(path, getAdmin);
  return [data, error, isLoading, mutate];
};
