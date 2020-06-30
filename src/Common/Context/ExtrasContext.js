import React, { createContext } from "react";
import useExtrasState from '../../Purchase/Hooks/useExtrasState';

export const ExtrasContext = createContext();

export const ExtrasProvider = (props) => {

  const {extras, handleExtrasChange} = useExtrasState(false);

  return (
    <ExtrasContext.Provider
      value={{
        extras,
        handleExtrasChange
      }}
    >
      {props.children}
    </ExtrasContext.Provider>
  );

};