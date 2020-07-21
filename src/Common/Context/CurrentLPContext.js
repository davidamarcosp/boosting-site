import React, { createContext } from "react";

export const CurrentLPContext = createContext();

export const CurrentLPProvider = (props) => {

  const [currentLP, setCurrentLP] = React.useState(0);

  const handleCurrentLPChange = event => {
    setCurrentLP(event.target.value);
  };

  return (
    <CurrentLPContext.Provider
      value={{
        currentLP,
        handleCurrentLPChange
      }}
    >
      {props.children}
    </CurrentLPContext.Provider>
  );

};