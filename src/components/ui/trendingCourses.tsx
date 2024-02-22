import { DUMMY_COURSES } from "@/constants";
import Carousel from "./carousel";
import CarouselCard from "./carouselCard";

const TrendingCourses = () => {
  const courses = DUMMY_COURSES.map((course, idx: number) => {
    return (
      <CarouselCard
        key={idx}
        title={course.title}
        rating={course.rating}
        nuOfStdents={course.noOfStudents}
        duration={course.duration}
        image={course.image}
      />
    );
  });

  return (
    <section className="w-full bg-white min-h-[90em] white flex flex-col items-center">
      <div className="flex flex-col items-center w-full overflow-x-hidden mt-10 max-w-[1300px] mx-auto p-0">
        <div className="w-full flex items-center justify-center mt-10 2xl:full">
          <Carousel
            numberOfElms={DUMMY_COURSES.length}
            title="Trending courses"
          >
            {courses}
          </Carousel>
        </div>
        <div className="w-full flex items-center justify-center mt-10 2xl:full">
          <Carousel numberOfElms={DUMMY_COURSES.length} title="Most popular">
            {courses}
          </Carousel>
        </div>
        <div className="w-full flex items-center justify-center mt-10 2xl:full">
          <Carousel numberOfElms={DUMMY_COURSES.length} title="New additions">
            {courses}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TrendingCourses;
