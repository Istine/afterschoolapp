import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="w-full h-[400px] flex items-center">
      <Loader2 size={100} color="gray" className="animate-spin " />
    </div>
  );
};

export default Loader;
