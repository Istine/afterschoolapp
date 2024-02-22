import { Skeleton } from "@/components/ui/skeleton";

export default () => {
  return (
    <div className="px-4">
      <Skeleton className="bg-[#ccc] w-full h-[100px] mt-5" />
      <div className="w-full flex items-center space-x-4 space-y-4">
        <Skeleton className="h-12 w-12 rounded-full bg-[#ccc]" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-[#ccc]" />
          <Skeleton className="h-4 w-[200px] bg-[#ccc]" />
        </div>
        <Skeleton className="h-12 w-12 rounded-full bg-[#ccc]" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-[#ccc]" />
          <Skeleton className="h-4 w-[200px] bg-[#ccc]" />
        </div>
        <Skeleton className="h-12 w-12 rounded-full bg-[#ccc]" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-[#ccc]" />
          <Skeleton className="h-4 w-[200px] bg-[#ccc]" />
        </div>
      </div>
      <div className="w-full flex items-center space-x-4 space-y-4">
        <Skeleton className="h-12 w-12 rounded-full bg-[#ccc]" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-[#ccc]" />
          <Skeleton className="h-4 w-[200px] bg-[#ccc]" />
        </div>
        <Skeleton className="h-12 w-12 rounded-full bg-[#ccc]" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-[#ccc]" />
          <Skeleton className="h-4 w-[200px] bg-[#ccc]" />
        </div>
        <Skeleton className="h-12 w-12 rounded-full bg-[#ccc]" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-[#ccc]" />
          <Skeleton className="h-4 w-[200px] bg-[#ccc]" />
        </div>
      </div>
      <Skeleton className="bg-[#ccc] w-full h-[230px] mt-5" />
    </div>
  );
};
