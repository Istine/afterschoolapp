import React from "react";

const state: {
  setState: any;
  state: "login" | "signup";
  visible: boolean;
} = {
  setState: () => "",
  state: "signup",
  visible: false,
};

const context = React.createContext(state);

export const SignupAndSignProvider = ({ children }: { children: any }) => {
  const { Provider } = context;

  const [appState, setAppState] = React.useState(state);

  return (
    <Provider value={{ ...appState, setState: setAppState }}>
      {children}
    </Provider>
  );
};

export const useLoginAndSignupModal = () => {
  const { state, visible, setState } = React.useContext(context);
  return [state, visible, setState];
};
