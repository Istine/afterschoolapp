"use client";

import Instructors from "@/components/pages/Instructor";
import { useToast } from "@/components/ui/use-toast";
import { createInstructorFormSchema } from "@/schema";
import { createInstructor } from "@/services/instructors";
import { InstructorType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const { toast } = useToast();

  const [image, setImageUrl] = React.useState<{
    url: string;
    blob: any;
    loaded: boolean;
  }>(() => ({
    url: "",
    blob: null,
    loaded: false,
  }));

  const [isLoading, setLoadingState] = React.useState(false);

  const form = useForm<z.infer<typeof createInstructorFormSchema>>({
    resolver: zodResolver(createInstructorFormSchema),
    defaultValues: {} as InstructorType,
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

    if (!image.blob) {
      toast({
        variant: "destructive",
        title: "Instructor creation ",
        description: "instructior must have a profile image",
      });
      setLoadingState(false);
      return;
    } else {
      formData.append("file", image.blob);

      const [, error] = await createInstructor(formData);

      const isSuccess = error ? "was not" : "was";

      const variant = error ? "destructive" : "default";

      const USER_MESSAGE = `Instructor ${values.firstName} ${isSuccess} created successfully`;

      toast({
        variant: variant,
        title: "Instructor creation ",
        description: USER_MESSAGE,
      });
    }
    setLoadingState(false);
    router.push("/admin/account/instructors");
  };

  return (
    <Instructors
      {...({} as InstructorType)}
      onSubmit={onSubmit}
      isLoading={isLoading}
      form={form}
      setImageUrl={setImageUrl}
      image={image}
      pageTitle="Create Instructor"
    />
  );
};

export default Page;
