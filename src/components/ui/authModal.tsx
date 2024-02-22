import { FormState } from "@/types";
import React from "react";
import { Button } from "./button";
import { AppleIcon, FacebookIcon } from "lucide-react";
import { Input } from "./input";

const AuthModal = ({
  visible,
  state,
  setFormState,
}: FormState & { setFormState: any }) => {
  const displayText =
    state === "signup"
      ? `Explore your creativity with thousands of inspiring classes in design, illustration, photography, and more.`
      : `Sign in to continue to your account.`;

  React.useEffect(() => {
    if (visible) {
      (document.querySelector("body") as HTMLBodyElement).style.overflow =
        "hidden";
    } else {
      (document.querySelector("body") as HTMLBodyElement).style.overflow =
        "scroll";
    }
  }, [visible]);

  return (
    <>
      {visible ? (
        <>
          <div
            onClick={() => {
              setFormState((prevState: FormState) => ({
                ...prevState,
                visible: false,
              }));
            }}
            className="w-full h-screen fixed bg-black z-[9999999] opacity-70"
          ></div>
          <div className="w-[40em] h-[35em] fixed bg-white z-[999999999] top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] flex">
            <div className="w-[17em] px-5 h-full bg-purple-800 flex flex-col items-center justify-center">
              <h3 className="text-white text-[1.5rem]  w-full fotn-bold">
                Welcome Back to Afterschool
              </h3>
              <div className="w-full h-[7px] rounded-[20px] bg-white mt-4"></div>
              <p className="w-full text-white mt-4">{displayText}</p>
            </div>
            <div className="w-[23em] h-full px-5">
              <Signup />
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default AuthModal;

const Signup = () => {
  return (
    <form action="">
      <div className="w-full flex flex-col mt-10">
        <Button variant="outline" className="mt-5 border-gray-400">
          <FacebookIcon color="blue" size={20} />
          <span className="text-[1rem]">Facebook</span>
        </Button>
        <Button variant="outline" className="mt-5 border-gray-400">
          <span className="text-[1.4rem] mr-1 font-bold text-red-700">G</span>
          <span className="text-[1rem]">Google</span>
        </Button>
        <Button variant="outline" className="mt-5 border-gray-400">
          <AppleIcon color="black" className="fill-black" size={20} />
          <span className="text-[1rem]">Apple</span>
        </Button>
      </div>
      <Input className="mt-4" placeholder="Email address" />
    </form>
  );
};
