import { useAppLoader } from "@/context/courseLoaderContext";
import { Progress } from "./progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";

const CreateCourseCLoader = () => {
  const [progress, isVisible, state, currentOperation] = useAppLoader();

  return isVisible ? (
    <>
      <Card className="w-[450px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background z-[99999999999999]">
        <CardHeader>
          <CardDescription className="grid">
            Your course assets are being {state}...
            <span>{currentOperation}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full" color="violet" />
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* <Button variant="outline">Cancel</Button> */}
        </CardFooter>
      </Card>
      <div className="w-screen h-screen fixed bg-background opacity-30 z-[999] inset-0 flex items-center justify-center"></div>
    </>
  ) : (
    ""
  );
};

export default CreateCourseCLoader;
