import { formatCount } from "@/lib/utils";
import { MetricCardType } from "@/types";
import { BarChart2 } from "lucide-react";

const MetricCard = ({ title, value, Icon, color, bg }: MetricCardType) => {
  return (
    <div className="min-w-[200px] flex items-center p-3 bg-background border border-solid border-b-1 border-e1e6f0 min-h-[70px]">
      <div className={`p-2 rounded-[7px] ${bg}`}>
        <Icon color={color} size={30} />
      </div>
      <div className="w-1/2 flex flex-col items-center">
        <p className="uppercase text-[12px] mt-1 text-foreground font-[600] text-gray-500">
          {title}
        </p>
        <span className="text-2xl font-bold">{formatCount(value)}</span>
      </div>
    </div>
  );
};

export default MetricCard;
