"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAdmin } from "@/hooks/useAdmin";
import { saveProfileChanges } from "@/services/admin";
import { AdminType } from "@/types";
import { Loader2 } from "lucide-react";
import React from "react";

const defaultValues: AdminType = {
  email: "",
  lastName: "",
  firstName: "",
  password: "",
  id: "",
};

const Page = () => {
  const path = "/admin";
  const [data = defaultValues as AdminType, error, loading, mutate] =
    useAdmin(path);

  const { toast } = useToast();

  const [form, setForm] = React.useState<AdminType>(defaultValues);

  const [isSubmitting, setSubmitting] = React.useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState: AdminType) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    let values = form;
    if (!form.password) {
      values = { ...values, password: data.password };
    }
    const [, error] = await saveProfileChanges(values);
    if (error) {
      toast({
        variant: "destructive",
        title: "profile update",
        description: "profile update not successfull",
      });
    } else {
      toast({
        title: "profile update",
        description: "profile update successfull",
      });
      mutate(path);
    }
    setSubmitting(false);
  };

  React.useEffect(() => {
    if (data) {
      const { password, ...rest } = data;
      setForm(rest);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="w-full flex flex -col justify-center p-3">
        <Loader2 size={30} color="gray" className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex -col justify-center p-3">
      <div className="w-2/3">
        <h1 className="mb-6 text-[1.5rem]">Account Profile</h1>
        <form onSubmit={onSubmit} className="w-full gap-3  grid grid-cols-2">
          <div className="w-full">
            <Input
              className=" mb-3 h-[30px]"
              type="email"
              name="email"
              onChange={onChange}
              value={form.email}
              placeholder="admin@app.com"
            />
            <Input
              className=" mb-3 h-[30px]"
              type="text"
              onChange={onChange}
              value={form.lastName}
              name="lastName"
              placeholder="lastname..."
            />
          </div>
          <div className="w-full">
            <Input
              className=" mb-3 h-[30px]"
              type="text"
              onChange={onChange}
              value={form.firstName}
              name="firstName"
              placeholder="firstname...."
            />
            <Input
              className=" mb-3 h-[30px]"
              type="password"
              onChange={onChange}
              value={form.password}
              name="password"
              placeholder="password..."
            />
          </div>
          <Button>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <span>Save changes</span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
