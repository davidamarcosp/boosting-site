import React, { createContext } from "react";

import useOrderState from '../../Purchase/Hooks/useOrderState';

export const PurchaseContext = createContext();

export const PurchaseProvider = (props) => {

  const {
    currentTier,
    handleCurrentTierChange,
    currentDivision,
    handleCurrentDivisionChange,
    currentLP,
    handleCurrentLPChange,
    desiredTier,
    handleDesiredTierChange,
    desiredDivision,
    handleDesiredDivisionChange,
    queueType,
    handleQueueTypeChange,
    numberOfGames,
    handleNumberOfGamesChange,
  } = useOrderState();

  return (
    <PurchaseContext.Provider
      value={{
        currentTier,
        handleCurrentTierChange,
        currentDivision,
        handleCurrentDivisionChange,
        currentLP,
        handleCurrentLPChange,
        desiredTier,
        handleDesiredTierChange,
        desiredDivision,
        handleDesiredDivisionChange,
        queueType,
        handleQueueTypeChange,
        numberOfGames,
        handleNumberOfGamesChange,
      }}
    >
      {props.children}
    </PurchaseContext.Provider>
  );

};