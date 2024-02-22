import {
  BrainCircuit,
  Building2,
  CloudCog,
  Code,
  DatabaseZap,
  KanbanSquare,
  SatelliteDish,
} from "lucide-react";

const CourseCategories = () => {
  return (
    <section className="w-full py-4 h-[30em] bg-gray-100 flex flex-col items-center">
      <div className="w-full h-4/5 mt-5">
        <h1 className="text-[3.7rem] w-full text-gray-800 text-center">
          Learn new skills. Discover your potential
        </h1>
        <div className="w-full h-[250px] flex items-end justify-center">
          <Card
            Icon={DatabaseZap}
            text="Data science"
            textColor="white"
            iconColor="white"
          />
          <Card
            Icon={Code}
            text="Programming & Development"
            textColor="white"
            iconColor="white"
          />
          <Card
            Icon={BrainCircuit}
            text="Artificial INtelligence"
            textColor="white"
            iconColor="white"
          />
          <Card
            Icon={Building2}
            text="Business"
            textColor="white"
            iconColor="white"
          />
          <Card
            Icon={SatelliteDish}
            text="Autonomous Systems"
            textColor="white"
            iconColor="white"
          />
          <Card
            Icon={KanbanSquare}
            text="Product Management"
            textColor="white"
            iconColor="white"
          />
          <Card
            Icon={CloudCog}
            text="Cloud Computing"
            textColor="white"
            iconColor="white"
          />
        </div>
      </div>
    </section>
  );
};

export default CourseCategories;

const Card = ({
  Icon,
  text,
  iconColor,
  textColor,
}: {
  Icon: any;
  text: string;
  textColor: string;
  iconColor: string;
}) => {
  return (
    <div className="w-[150px] h-[170px] flex flex-col items-center justify-center rounded-[10px] bg-violet-800 mx-2 border border-4 hover:border-fuchsia-500">
      <Icon size={40} color={iconColor} />
      <span className={`text-${textColor} w-2/3 text-center mt-2`}>{text}</span>
    </div>
  );
};
