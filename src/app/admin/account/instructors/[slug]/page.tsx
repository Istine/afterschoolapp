"use client";

import Instructors from "@/components/pages/Instructor";
import { useToast } from "@/components/ui/use-toast";
import { useInstructor } from "@/hooks/useInstructor";
import { createInstructorFormSchema } from "@/schema";
import { updateInstructorById } from "@/services/instructors";
import { InstructorType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function Page({ params }: { params: { slug: string } }) {
  const path = `/instructor/${params.slug}`;

  const [data, error, isRequestLoading, mutate] = useInstructor(path);

  const { toast } = useToast();

  const [isLoading, setLoadingState] = React.useState(false);

  const [image, setImageUrl] = React.useState<{
    url: string;
    blob: File | undefined;
    loaded: boolean;
  }>(() => ({
    url: (data ? (data as InstructorType) : ({} as InstructorType)).imageUrl,
    blob: undefined,
    loaded: false,
  }));

  const form = useForm<z.infer<typeof createInstructorFormSchema>>({
    resolver: zodResolver(createInstructorFormSchema),
    defaultValues: data as InstructorType,
  });

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoadingState(true);
    const formData = new FormData();

    const values: { [key: string]: string } = form.getValues();

    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        formData.append(key, values[key]);
      }
    }

    if (image.blob) formData.append("file", image.blob as Blob);

    formData.append("id", data.id);

    const [, error] = await updateInstructorById(formData as any);

    const isSuccess = error ? "was not" : "was";

    const variant = error ? "destructive" : "default";

    const USER_MESSAGE = `Instructor ${values.firstName} ${isSuccess} updated successfully`;

    toast({
      variant: variant,
      title: "Instructor update ",
      description: USER_MESSAGE,
    });

    setLoadingState(false);
    mutate(path);
  };

  if (isRequestLoading) return <b>loading...</b>;

  return (
    <Instructors
      {...(data as InstructorType)}
      onSubmit={onSubmit}
      isLoading={isLoading}
      form={form}
      setImageUrl={setImageUrl}
      image={image}
      pageTitle="Update Instructor"
    />
  );
}
