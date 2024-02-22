import { UserCircle } from "lucide-react";
import Link from "next/link";

const Reviews = () => {
  return (
    <section className="w-full h-[30em] bg-gray-100  overflow-hidden">
      <div className="w-full h-full max-w-[1300px] mx-auto flex flex-col justify-center  p-7">
        <h2 className="font-bold text-[1.8rem] font-sans ml-10 ">
          What are Learners are saying
        </h2>
        <div className="w-full h-4/5 flex items-center justify-evenly">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
        <Link href="/" className="underline text-violet-900">
          All Reviews
        </Link>
      </div>
    </section>
  );
};

export default Reviews;

const ReviewCard = () => {
  return (
    <div className="w-[350px] h-[250px] rounded-tl-[30px] rounded-br-[30px] bg-white border border-1 border-gray-300 p-7 flex flex-col justify-between">
      <p>
        Afterschool helped me gain on-the-job confidence, build a portfolio, and
        earn a microcredential to share with prospective employers.
      </p>
      <div className="w-full flex items-center">
        <UserCircle
          strokeWidth={0.5}
          size={30}
          className="fill-blue-500 stroke-white"
        />
        <p>Ben, Business Analyst</p>
      </div>
    </div>
  );
};
