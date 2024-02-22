"use client";

import { Inter } from "next/font/google";
import { routes } from "@/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NextBreadcrumb from "@/components/ui/BreadCrumbs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Loader2, LogOut, User } from "lucide-react";
import React from "react";
import { logout } from "@/services/auth";
import { useRouter } from "next/navigation";
import CreateCourseCLoader from "@/components/ui/createCourseProgress";
import { CourseLoaderProvider } from "@/context/courseLoaderContext";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setLoading] = React.useState(false);

  const pathName = usePathname();

  const { replace } = useRouter();

  const handleLogout = async (e: React.MouseEvent<HTMLLIElement>) => {
    setLoading(true);
    const [, error] = await logout();
    if (!error) {
      replace("/admin/login");
    }
    setLoading(false);
  };

  return (
    <CourseLoaderProvider>
      <div>
        <CreateCourseCLoader />
        <nav className="w-full bg-background overflow-hidden sticky top-0 z-[1]">
          <div className="w-full flex items-center justify-between px-2 border border-solid border-b-1 border-e1e6f0 max-w-[1400px] mx-auto">
            <div className="w-auto flex items-center">
              <Link href="/admin/account">
                <Image
                  width={150}
                  height={50}
                  src="/logo.png"
                  alt="logo image"
                />
              </Link>
              <NextBreadcrumb
                homeElement={"Home"}
                separator={<span> | </span>}
                activeClasses="text-primary"
                containerClasses="flex py-5 bg-background text-sm mx-auto"
                listClasses="hover:underline mx-2 font-bold"
                capitalizeLinks
              />
            </div>
            <div className="flex w-[100px]">
              <Popover>
                <PopoverTrigger>
                  <Avatar className="h-[30px] w-[30px]">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-background p-1">
                      IS
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-[10rem] p-1">
                  <ul className="w-full m-0 p-0">
                    <li className="w-full font-bold capitalize p-2 truncate text-[14] text-gray-700 ">
                      <span>Imanche Sabastine</span>
                    </li>
                    <Link
                      className="w-full flex items-center"
                      href="/admin/account/profile"
                    >
                      {" "}
                      <li className="w-full flex items-center p-2 m-0 capitalize cursor-pointer hover:bg-primary hover:text-background">
                        <User color="violet" size={20} className="mr-3" />
                        <span>Profile</span>
                      </li>
                    </Link>

                    <li
                      onClick={handleLogout}
                      className="w-full flex items-center p-2 m-0 capitalize cursor-pointer hover:bg-primary hover:text-background"
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <LogOut color="violet" size={20} className="mr-3" />
                      )}
                      <span>Logout</span>
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </nav>
        <div className="flex w-full h-full max-w-[1400px] mx-auto">
          <div className="w-1/5 h-[88vh] bg-background rounded-xl hidden p-2 overflow-auto border border-solid border-r-1 border-e1e6f0 sticky top-[70px] laptop:block 2xl:ml-4 2xl:h-full 2xl:top-[80px]">
            <ul className="w-full m-0 p-0 bg">
              {routes.map(
                (
                  route: { path: string; name: string; icon: any },
                  idx: number
                ) => {
                  const iconColor =
                    pathName === route.path ? "violet" : "black";

                  return (
                    <li
                      key={idx}
                      className="w-full py-4 px-2 text-foreground m-o capitalize bg-background duration-200 ease hover:bg-violet-500 hover:text-white hover:font-bold"
                    >
                      <Link
                        href={route.path}
                        className="flex w-full px-4 items-center"
                      >
                        <route.icon color={iconColor} />
                        <span className={`ml-5 text-sm`}>{route.name}</span>
                      </Link>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
          <div className="phone:w-full overflow-hidden laptop:w-4/5">
            {children}
          </div>
        </div>
      </div>
    </CourseLoaderProvider>
  );
};

export default RootLayout;
