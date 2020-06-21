import React, { createContext } from "react";

import useTierAndDivisionState from '../../Purchase/Hooks/useTierAndDivisionState';

export const TierAndDivisionContext = createContext();

export const TierAndDivisionProvider = (props) => {

  const {
    currentTier,
    handleCurrentTierChange,
    currentDivision,
    handleCurrentDivisionChange,
    desiredTier,
    handleDesiredTierChange,
    desiredDivision,
    handleDesiredDivisionChange,
  } = useTierAndDivisionState();

  return (
    <TierAndDivisionContext.Provider
      value={{
        currentTier,
        handleCurrentTierChange,
        currentDivision,
        handleCurrentDivisionChange,
        desiredTier,
        handleDesiredTierChange,
        desiredDivision,
        handleDesiredDivisionChange,
      }}
    >
      {props.children}
    </TierAndDivisionContext.Provider>
  );

};