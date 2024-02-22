import { useRouter as Router, useParams } from "next/navigation";

export const useRouter = () => {
  const router = Router();

  return [router];
};
