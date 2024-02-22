const AnimatedCard = ({
  className,
  title,
}: {
  className: string;
  title: string;
}) => {
  return (
    <div
      className={` w-[220px] h-[200px] flex items-center justify-center ${className} bg-cover bg-no-repeat rounded-[15px] relative after:absolute after:content-[''] after:bg-black after:z-[2] after:w-full after:h-full after:opacity-50 after:rounded-[15px]`}
    >
      <h2 className="absolute text-white z-[5] text-[1.5rem]">{title}</h2>
    </div>
  );
};

export default AnimatedCard;
