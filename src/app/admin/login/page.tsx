"use client";

import { loginFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { login } from "@/services/auth";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();

  const [reqErrors, setLoginReqErrors] = React.useState<Array<string>>([]);

  const [isLoading, setLoadingState] = React.useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setLoadingState(true);
    const response = await login(values);

    if (!response.length) {
      setLoginReqErrors(["invalid email and password combination"]);
      setTimeout(() => {
        setLoginReqErrors([]);
      }, 2000);
    } else {
      push("/admin/account");
    }
    setLoadingState(false);
  };

  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center">
      <Image width={200} height={50} src="/logo.png" alt="logo image" />
      <div className="phone:bg-background relative w-full h-auto flex flex-col items-center justify-between p-4 rounded-lg tablet:w-2/3 laptop:w-2/6">
        <h1 className="text-2xl mb-6">Sign in</h1>
        <div className="space-y-8 w-3/4">
          {reqErrors.map((error: string, idx: number) => (
            <span
              className="w-full text-destructive text-sm capitalize mb-4"
              key={idx}
            >
              {error}
            </span>
          ))}
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-3/4 "
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary-foreground">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-input"
                      placeholder="christopher@columbus.us"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary-foreground">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-input"
                      placeholder="password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              disabled={
                Boolean(form.formState.errors.email) ||
                Boolean(form.formState.errors.password) ||
                isLoading
              }
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
