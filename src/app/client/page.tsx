"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AppleIcon,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FacebookIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import React from "react";
import { THINGS_TO_EXPECT } from "@/constants";

import TrendingCourses from "@/components/ui/trendingCourses";
import CourseCategories from "@/components/ui/courseCategories";
import Reviews from "@/components/ui/reviews";
import {
  SignupAndSignProvider,
  useLoginAndSignupModal,
} from "@/context/clientLoginContext";
import AuthModal from "@/components/ui/authModal";
import { FormState } from "@/types";

const defaultValues: FormState = {
  state: "signup",
  visible: false,
};

const Page = () => {
  const [formState, setFormState] = React.useState<FormState>(defaultValues);

  const ListItems = THINGS_TO_EXPECT.map((item: string, id: number) => (
    <li className="flex no-underline py-3 font-bold text-[1.6rem]" key={id}>
      <Image
        src="/assets/check.png"
        className=""
        width={40}
        height={40}
        alt="check icon"
      />
      <span className="ml-2">{item}</span>
    </li>
  ));

  const onClick = (val: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    setFormState((prevState: any) => {
      return { ...prevState, state: val, visible: true };
    });
  };

  return (
    <SignupAndSignProvider>
      <AuthModal {...formState} setFormState={setFormState} />
      <div className="w-full bg-black">
        <div className="w-full relative h-[62em] 2xl:h-[56em]">
          <nav className="w-full flex h-[80px] absolute top-0 mx-auto flex items-center justify-between p-4 md:p-5 z-[999] relative min-h-[59px] bg-gradient-to-b from-black to-transparent">
            <div className="flex items-center ">
              <Link href="/client" className="mt-1">
                <Image
                  width={170}
                  height={50}
                  src="/logo_white.png"
                  alt="logo image"
                />
              </Link>
              <CategoryMenu />
            </div>
            <div className="flex">
              <Button
                onClick={onClick("login")}
                className="mx-1 bg-transparent    hover:bg-transparent"
              >
                Sign in
              </Button>
              <Button onClick={onClick("signup")} className="mx-1 font-bold">
                Sign up
              </Button>
            </div>
          </nav>
          <div className="w-full absolute top -0 grid grid-cols-4 grid-rows-4 gap-2 h-full  top-0 2xl:grid-cols-6">
            <div className="h-full  row-span-2 bg-learn-one bg-cover bg-no-repeat 2xl:col-span-2"></div>
            <div className=" h-full bg-learn-two bg-cover bg-center bg-no-repeat"></div>
            <div className=" h-full  bg-learn-three bg-cover bg-center bg-no-repeat"></div>
            <div className=" h-full row-span-2 bg-learn-four bg-cover bg-center bg-no-repeat 2xl:col-span-2 2xl:bg-top"></div>
            <div className=" bg-white h-full col-span-2 row-span-2 flex flex-col items-center justify-center">
              <div className="w-[400px]  flex  flex-col items-center  justify-between">
                <GetStartedForm />
              </div>
            </div>
            <div className=" bg-learn-five bg-cover bg-center bg-no-repeat h-full row-span-2 2xl:col-span-2 "></div>
            <div className="bg-learn-six bg-cover bg-center bg-no-repeat h-full row-span-2 2xl:col-span-2 "></div>
            <div className=" bg-learn-seven bg-cover bg-bottom bg-no-repeat h-full "></div>
            <div className="bg-learn-eight bg-cover bg-bottom bg-no-repeat  h-full "></div>
          </div>
        </div>
        <CourseCategories />
        <TrendingCourses />
        <section className="w-full h-[35em] bg-violet-100">
          <div className="w-full h-full grid grid-cols-2 max-w-[1300px] mx-auto">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-3/4 h-5/6 bg-violet-200 rounded-tl-[30px] rounded-br-[30px]">
                <video
                  src="/video/workspaces.webm"
                  autoPlay
                  muted
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="w-full h-full flex flex-col px-7 justify-center">
              <h2 className="font-bold text-[2.5rem]">
                The Afterschool Special
              </h2>
              <h3 className="font-bold text-[1rem] my-3">
                Prove Mastery Through Hands-On Projects
              </h3>
              <p>
                Our open-ended projects are modeled after real-world workplace
                scenarios, and require in-depth critical thinking and creative
                solutions.
              </p>
              <h3 className="font-bold text-[1rem] my-3">
                Succeed with Personalized Feedback
              </h3>
              <p>
                Every project receives personalized feedback from industry
                experts, and our mentors are available to answer questions
                whenever you are feeling stuck.
              </p>
            </div>
          </div>
        </section>
        <Reviews />
        <section className="w-full h-[18em] bg-blue-950 ">
          <div className="w-full h-full flex flex-col items-center justify-center max-w-[1300px] mx-auto">
            <span className="text-white">Get Started Today</span>
            <p className="text-white font-bold text-[2rem]">
              Learn. Grow. Succeed.
            </p>
            <Button className="mt-2 w-[200px] h-[50px]">
              <span className="text-lg">Start for Free</span>
              <ArrowRight strokeWidth={1} className="mx-2" />
            </Button>
          </div>
        </section>
        <footer className="w-full h-[30em] bg-white">
          <div className="w-full h-full max-w-[1300px] mx-auto p-7">
            <span className=" w-[170px] h-[70px]">
              <Image
                src="/logo.png"
                width={170}
                height={70}
                alt="afteschool logo"
              />
            </span>
            <div className="w-full h-full grid grid-cols-4">
              <div className="w-full h-full flex  flex-col py-7">
                <div className="w-full h-full px-4">
                  <h3 className="font-bold text-xl">Company</h3>
                  <ul>
                    <li className="hover:underline my-2">
                      <Link href="/client/about-us">About us</Link>
                    </li>
                    <li className="hover:underline my-2">
                      <Link href="/client/why-us">Why Afterschool?</Link>
                    </li>
                    <li className="hover:underline my-2">
                      <Link href="/client/blog">Blog</Link>
                    </li>
                    <li className="hover:underline my-2">
                      <Link href="/client/jobs">Jobs at Afterschool</Link>
                    </li>
                  </ul>
                  <h3 className="font-bold text-xl mt-3">Resources</h3>
                  <ul>
                    <li className="hover:underline my-2">
                      <Link href="/client/catalog">Catalog</Link>
                    </li>
                    <li className="hover:underline my-2">
                      <Link href="/client/help">Help and FAQ</Link>
                    </li>
                    <li className="hover:underline my-2">
                      <Link href="/client/scholarship">Scholarship</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full h-full flex  flex-col py-7">
                <div className="w-full h-full px-4">
                  <h3 className="font-bold text-xl">Company</h3>
                  <ul>
                    <li className="hover:underline my-2">
                      <Link href="/client/about-us">About us</Link>
                    </li>
                    <li className="hover:underline my-2">
                      <Link href="/client/why-us">Why Afterschool?</Link>
                    </li>
                    <li className="hover:underline my-2">
                      <Link href="/client/blog">Blog</Link>
                    </li>
                    <li className="hover:underline my-2">
                      <Link href="/client/jobs">Jobs at Afterschool</Link>
                    </li>
                  </ul>
                  <h3 className="font-bold text-xl mt-3">Resources</h3>
                  <ul>
                    <li className="hover:underline my-2">
                      <Link href="/client/catalog">Catalog</Link>
                    </li>
                    <li className="hover:underline my-2">
                      <Link href="/client/help">Help and FAQ</Link>
                    </li>
                    <li className="hover:underline my-2">
                      <Link href="/client/scholarship">Scholarship</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full h-full flex  flex-col py-7">
                <div className="w-full h-full px-4">
                  <h3 className="font-bold text-xl">Company</h3>
                  <ul>
                    <li className="hover:underline my-2">
                      <Link href="/client/about-us">About us</Link>
                    </li>
                    <li className="hover:underline my-2">
                      <Link href="/client/why-us">Why Afterschool?</Link>
                    </li>
                    <li className="hover:underline my-2">
                      <Link href="/client/blog">Blog</Link>
                    </li>
                    <li className="hover:underline my-2">
                      <Link href="/client/jobs">Jobs at Afterschool</Link>
                    </li>
                  </ul>
                  <h3 className="font-bold text-xl mt-3">Resources</h3>
                  <ul>
                    <li className="hover:underline my-2">
                      <Link href="/client/catalog">Catalog</Link>
                    </li>
                    <li className="hover:underline my-2">
                      <Link href="/client/help">Help and FAQ</Link>
                    </li>
                    <li className="hover:underline my-2">
                      <Link href="/client/scholarship">Scholarship</Link>
                    </li>
                  </ul>
                </div>
              </div>{" "}
              <div className="w-full h-full flex  flex-col py-7">
                <div className="w-full h-full px-4">
                  <h3 className="font-bold text-xl">Company</h3>
                  <ul>
                    <li className="hover:underline my-2">
                      <Link href="/client/about-us">About us</Link>
                    </li>
                    <li className="hover:underline my-2">
                      <Link href="/client/why-us">Why Afterschool?</Link>
                    </li>
                    <li className="hover:underline my-2">
                      <Link href="/client/blog">Blog</Link>
                    </li>
                    <li className="hover:underline my-2">
                      <Link href="/client/jobs">Jobs at Afterschool</Link>
                    </li>
                  </ul>
                  <h3 className="font-bold text-xl mt-3">Resources</h3>
                  <ul>
                    <li className="hover:underline my-2">
                      <Link href="/client/catalog">Catalog</Link>
                    </li>
                    <li className="hover:underline my-2">
                      <Link href="/client/help">Help and FAQ</Link>
                    </li>
                    <li className="hover:underline my-2">
                      <Link href="/client/scholarship">Scholarship</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </SignupAndSignProvider>
  );
};

export default Page;

const CategoryMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-white font-bold hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white">
            Browse
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] bg-white h-[400px]"></div>
            {/* <NavigationMenuLink>Link</NavigationMenuLink> */}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const GetStartedForm = () => {
  return (
    <form className="w-full mt-6">
      <h1 className="text-[2.1rem] font-sans text-center w-full font-bold capitalize">
        Your Learning path to{" "}
        <span className="text-violet-600 mr-1">endless </span>
        <span>growth</span>
      </h1>
      <div className="w-full flex items-center  justify-between mt-4">
        <Button variant="outline">
          <FacebookIcon color="blue" size={20} />
          <span className="text-[1rem]">Facebook</span>
        </Button>
        <Button variant="outline">
          <span className="text-[1.4rem] mr-1 font-bold text-red-700">G</span>
          <span className="text-[1rem]">Google</span>
        </Button>
        <Button variant="outline">
          <AppleIcon color="black" className="fill-black" size={20} />
          <span className="text-[1rem]">Apple</span>
        </Button>
      </div>
      <Input
        placeholder="Email address"
        className="h-[35px] border-[1px] border-slate-600 mt-4"
      />
      <Button className="mt-6 w-full font-bold text-[1rem]">
        Start Learning Today
      </Button>
      <p className="text-[10px] mt-5">
        By signing up you agree to Afterschool&lsquo;s Terms of Service and
        Privacy Policy, and agree to receive marketing communications from
        Skillshare at the email address provided. This page is protected by
        reCAPTCHA and is subject to Google&lsquo;s Terms of Service and Privacy
        Policy.
      </p>
    </form>
  );
};
