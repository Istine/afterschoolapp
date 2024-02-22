import { Star } from "lucide-react";
import React from "react";

const RatingContainer = ({
  starCount,
  classes = "",
}: {
  starCount: number;
  classes?: string;
}) => {
  const [startState, setStarState] = React.useState<boolean[]>([]);

  const stars = startState.map((colored: boolean, index: number) => {
    const className = `${
      colored ? "fill-amber-500 stroke-amber-500" : "stroke-amber-500"
    }${classes}`;
    return <Star key={index} size={15} className={className} />;
  });

  React.useEffect(() => {
    const defaultArr = new Array(starCount).fill(true);
    setStarState(defaultArr);
  }, [starCount]);

  return <div className="flex items-center">{stars}</div>;
};

export default RatingContainer;
