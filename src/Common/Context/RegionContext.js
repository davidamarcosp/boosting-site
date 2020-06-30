import React, { createContext } from "react";
import useRegionState from '../../Purchase/Hooks/useRegionState';

export const RegionContext = createContext();

export const RegionProvider = (props) => {

  const { region, handleRegionChange } = useRegionState('NA');

  return (
    <RegionContext.Provider
      value={{
        region,
        handleRegionChange
      }}
    >
      {props.children}
    </RegionContext.Provider>
  );

};