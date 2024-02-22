import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import React from "react";

const Carousel = ({
  title,
  children,
  numberOfElms,
}: {
  children: React.ReactNode;
  title: string;
  numberOfElms: number;
}) => {
  const ref = React.useRef() as any;

  const [pos, setPos] = React.useState<number>(100);

  const [offSet, setOffSet] = React.useState<number>(0);

  const orignalCount = Math.round(numberOfElms - 5) * 220;
  const arrowLeftDisabled = -pos + 100 === orignalCount;
  const arrowRightDisabled = pos === 100;

  const slideRight = () => {
    if (arrowRightDisabled) {
      return;
    }
    setPos((prevPos) => prevPos + 220);
  };

  const slideLeft = () => {
    if (arrowLeftDisabled) {
      return;
    }
    setPos((prevPos) => prevPos - 220);
  };

  function handleMediaQueryChange(event: any) {
    if (event.matches) {
      setOffSet(100);
    } else {
      setOffSet(0);
    }
  }

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1300px)");

    // Initial check
    handleMediaQueryChange(mediaQuery);

    // Add listener for changes
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      // Cleanup: Remove the listener when the component is unmounted
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  React.useEffect(() => {
    (ref.current as HTMLDivElement).style.transform = `translateX(${
      pos - offSet
    }px)`;
  }, [pos, offSet]);

  return (
    <div className="w-full">
      <div className="w-5/6 translate-x-[100px] flex items-center justify-between  2xl:w-full 2xl:translate-x-0">
        <h1 className="text-[1.6rem]">{title}</h1>

        <div className="flex items-center">
          <ArrowLeftCircle
            onClick={slideLeft}
            strokeWidth={0.7}
            size={50}
            className={` ${
              arrowLeftDisabled
                ? "fill-white stroke-gray-300 hover:stroke-gray-300 hover:fill-white cursor-no-drop"
                : "mx-2 cursor-pointer hover:fill-purple-500 hover:stroke-white cursor-pointer"
            }`}
          />
          <ArrowRightCircle
            onClick={slideRight}
            strokeWidth={0.7}
            size={50}
            className={` ${
              arrowRightDisabled
                ? "fill-white stroke-gray-300 hover:stroke-gray-300 hover:fill-white cursor-no-drop"
                : "mx-2 cursor-pointer hover:fill-purple-500 hover:stroke-white cursor-pointer"
            }`}
          />
        </div>
      </div>
      <div className="w-[1300px] h-[320px] overflow-hidden relative 2xl:w-full">
        <div
          ref={ref}
          className={`w-full h-full absolute top-0 left-0 flex transition duration-300 ease-in-out translate-x-[${
            pos - offSet
          }px]`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
