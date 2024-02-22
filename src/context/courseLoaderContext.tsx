import React from "react";

const state: {
  isVisible: boolean;
  progress: number;
  setLoaderState: any;
  currentOp: string;
  state: "created" | "updated";
} = {
  isVisible: false,
  setLoaderState: () => "",
  progress: 0,
  state: "created",
  currentOp: "",
};

const context = React.createContext(state);

export const CourseLoaderProvider = ({ children }: { children: any }) => {
  const { Provider } = context;

  const [laoderState, setLoaderState] = React.useState(state);

  return (
    <Provider value={{ ...laoderState, setLoaderState }}>{children}</Provider>
  );
};

export const useAppLoader = () => {
  const { isVisible, setLoaderState, progress, state, currentOp } =
    React.useContext(context);
  return [progress, isVisible, state, currentOp, setLoaderState];
};
