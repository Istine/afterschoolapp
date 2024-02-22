import RatingContainer from "./RatingContainer";

const CarouselCard = ({
  title,
  rating,
  nuOfStdents,
  duration,
  image,
}: {
  title: string;
  rating: number;
  nuOfStdents: number;
  duration: string;
  image: string;
}) => {
  return (
    <div
      className={`w-[200px] flex-none h-[320px] mt-4 mx-3 flex items-end  overflow-hidden relative z-[1] ${image} bg-cover after:bg-gradient-to-t after:from-black after:to-transparent after:z-[2] after:absolute after:top-0 after:left-0 after:content-[''] after:w-full after:h-full before:content-[''] before:absolute  before:w-[200px] before:h-[200px] before:bg-white before:opacity-10 before:right-0  before:z-[4] before:rounded-[50%] before:transition before:duration-400 before:ease before:translate-y-[200%] before:translate-x-[100%] hover:before:translate-y-[-50%] hover:before:translate-x-[-30%]`}
    >
      <div className="w-full flex flex-col h-2/4 px-4 z-[9999]">
        <h2 className="text-white font-bold max-w-[100px]">{title}</h2>
        <div className="flex items-center mt-2">
          <RatingContainer
            classes=" fill-purple-500 stroke-purple-500"
            starCount={rating}
          />
          <span className="text-sm text-white font-sans">{nuOfStdents}</span>
        </div>
        <p className="text-sm text-white font-sans mt-2">
          {duration}, Beginner
        </p>
      </div>
    </div>
  );
};

export default CarouselCard;
