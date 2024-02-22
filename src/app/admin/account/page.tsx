import ActiveUsers from "@/components/ui/ActiveUsers";
import dynamic from "next/dynamic";
import MonthlySalesOverview from "@/components/ui/MonthlySalesOverview";
import RecentStudents from "@/components/ui/RecentStudents";
import Subscriptions from "@/components/ui/Subscriptions";
import TotalRevenue from "@/components/ui/TotalRevenue";
import { Library, User2, BookOpenCheck, Presentation } from "lucide-react";

const MetricCard = dynamic(() => import("@/components/ui/MetricCard"), {
  ssr: false,
});

const Dashboard = () => {
  return (
    <div className="w-full flex flex-col py-4 px-6">
      <div className="w-full flex justify-between">
        <MetricCard
          title="courses"
          value={310}
          color="violet"
          Icon={Library}
          bg="bg-[#f9e6fa]"
        />
        <MetricCard
          title="instructors"
          value={22}
          color="#8aedbb"
          Icon={User2}
          bg="bg-[#e6faf0]"
        />
        <MetricCard
          title="modules"
          value={718}
          color="#e8843c"
          Icon={BookOpenCheck}
          bg="bg-[#fceadc]"
        />
        <MetricCard
          title="lessons"
          value={4023}
          color="#dbaa21"
          Icon={Presentation}
          bg="bg-[#faf5e8]"
        />
      </div>
      <div className="w-full flex justify-between mt-5">
        <TotalRevenue />
        <Subscriptions />
        <ActiveUsers />
      </div>
      <div className="w-full flex justify-between mt-5">
        <MonthlySalesOverview />
      </div>
      <div className="w-full flex justify-between mt-5">
        <RecentStudents />
      </div>
    </div>
  );
};

export default Dashboard;
