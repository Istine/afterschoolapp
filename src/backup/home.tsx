"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="w-full bg-black">
      <div className="w-full relative h-[40em] 2xl:h-[56em]">
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
            <Button className="mx-1 bg-transparent    hover:bg-transparent">
              Sign in
            </Button>
            <Button className="mx-1 font-bold">Sign up</Button>
          </div>
        </nav>
        <div className="w-full absolute top-0 h-full grid grid-cols-5 gap-2 grid-rows-2">
          <div className="bg-learn-one bg-cover bg-no-repeat col-span-2"></div>
          <div className="bg-learn-two bg-cover bg-no-repeat row-span-2"></div>
          <div className="bg-learn-five bg-cover  bg-center bg-no-repeat col-span-2 "></div>
          <div className="bg-learn-eight bg-cover bg-no-repeat col-span-2"></div>
          <div className="bg-learn-seven bg-cover bg-no-repeat"></div>
          <div className="bg-learn-six bg-cover bg-top bg-no-repeat"></div>
        </div>
      </div>
    </div>
  );
};

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

export default Page;
