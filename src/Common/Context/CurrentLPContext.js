import React, { createContext } from "react";
import useCurrentLPState from '../../Purchase/Hooks/useCurrentLPState';

export const CurrentLPContext = createContext();

export const CurrentLPProvider = (props) => {

  const { currentLP, handleCurrentLPChange } = useCurrentLPState(0);

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