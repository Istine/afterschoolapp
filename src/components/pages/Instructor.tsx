"use client";

import { createInstructorFormSchema } from "@/schema";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_AVATAR } from "@/constants";
import Image from "next/image";
import { InstructorType } from "@/types";

export default function Instructors({
  onSubmit,
  isLoading,
  form,
  image,
  setImageUrl,
  pageTitle,
  ...rest
}: InstructorType & {
  onSubmit: any;
  isLoading: boolean;
  form: ReturnType<typeof useForm<z.infer<typeof createInstructorFormSchema>>>;
  image: { url: string; blob: File | undefined; loaded: boolean };
  setImageUrl: any;
  pageTitle: string;
}) {
  const ref = React.useRef() as any;

  if (!form.formState.defaultValues) {
    form.setValue("firstName", rest.firstName);
    form.setValue("lastName", rest.lastName);
    form.setValue("email", rest.email);
    form.setValue("bio", rest.bio);
    form.setValue("specialization", rest.specialization);
  }

  return (
    <div className="w-full flex flex-col py-4 px-6 mb-4">
      <h2 className="mb-6 font-bold text-2xl">{pageTitle}</h2>
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="space-y-8 w-full flex flex-col"
          encType="multipart/form-data"
        >
          <div className="w-full flex flex-col">
            <Image
              loader={() => image.url}
              width={150}
              unoptimized
              height={150}
              className="w-1/4 h-[220px] mb-4 rounded-lg"
              src={
                image.url
                  ? image.url
                  : rest.imageUrl
                  ? rest.imageUrl
                  : DEFAULT_AVATAR
              }
              alt="profile image"
            />
            <input
              type="file"
              className="hidden"
              ref={ref}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const { files } = e.target;
                if (!!files)
                  setImageUrl({
                    blob: files[0] as Blob,
                    url: URL.createObjectURL(files[0]),
                    loaded: true,
                  });
              }}
            />
            <Button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                ref.current.click();
              }}
              className="w-1/4 bg-[#eee]"
              variant="outline"
            >
              Upload new image
            </Button>
          </div>
          <div className="w-full flex">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full px-6">
                  <FormLabel className="text-secondary-foreground">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-background w-full"
                      placeholder="christopher@columbus.us"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full px-6">
                  <FormLabel className="text-secondary-foreground">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      className="bg-background w-full"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full px-6">
                  <FormLabel className="text-secondary-foreground">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      className="bg-background w-full"
                      placeholder="christopher@columbus.us"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem className="w-full px-6">
                  <FormLabel className="text-secondary-foreground">
                    Specialization
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      className="bg-background w-full"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid w-full gap-1.5 px-6">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormLabel
                    htmlFor="message-2"
                    className="text-secondary-foreground"
                  >
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      required
                      minLength={30}
                      className="h-[15em]"
                      placeholder="Type your message here."
                      id="message-2"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">
                    Your Bio must be atleast 30 characters in length
                  </p>
                </FormItem>
              )}
            />

            <Button
              className="w-1/4 mt-4"
              type="submit"
              disabled={
                !((form.formState.isDirty || image.loaded) && !isLoading)
              }
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
