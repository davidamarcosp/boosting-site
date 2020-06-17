import React from 'react';
import useCurrentTierState from './useCurrentTierState';
import useCurrentDivisionState from './useCurrentDivisionState';
import useCurrentLPState from './useCurrentLPState';
import useDesiredTierState from './useDesiredTierState';
import useDesiredDivisionState from './useDesiredDivisionState';
import useQueueTypeState from './useQueueTypeState';
import useNumberGames from './useNumberGames';

const useDivisionState = () => {

  const { currentTier, setCurrentTier } = useCurrentTierState(2);
  const { currentDivision, setCurrentDivision } = useCurrentDivisionState(3);
  const { currentLP, setCurrentLP } = useCurrentLPState(0);
  const { desiredTier, setDesiredTier } = useDesiredTierState(3);
  const { desiredDivision, setDesiredDivision } = useDesiredDivisionState(0);
  const { queueType, setQueueType } = useQueueTypeState("Division");
  const { numberOfGames, setNumberOfGames } = useNumberGames(1);

  React.useEffect(() => {
    if (currentTier === 5 && currentDivision === 3) {
      setCurrentDivision(2);
      setDesiredTier(5);
      setDesiredDivision(3);
    } else if (currentTier >= desiredTier && currentDivision === 3) {
      setDesiredTier(currentTier + 1);
      setDesiredDivision(0);
    } else if (currentTier >= desiredTier && currentDivision >= desiredDivision) {
      setDesiredTier(currentTier);
      setDesiredDivision(currentDivision + 1);
    } else if (currentTier >= desiredTier && currentDivision < desiredDivision) {
      setDesiredTier(currentTier);
    }
  },
    [
      currentTier,
      currentDivision,
      setCurrentDivision,
      desiredTier,
      setDesiredTier,
      desiredDivision,
      setDesiredDivision
    ]
  );

  const handleCurrentTierChange = event => {
    setCurrentTier(event.target.value);
  };

  const handleCurrentDivisionChange = event => {
    setCurrentDivision(event.target.value);
  };

  const handleCurrentLPChange = event => {
    setCurrentLP(event.target.value);
  };

  const handleDesiredTierChange = event => {
    setDesiredTier(event.target.value);
  };

  const handleDesiredDivisionChange = event => {
    setDesiredDivision(event.target.value);
  };

  const handleQueueTypeChange = event => {
    setQueueType(event.target.value);
  };

  const handleNumberOfGamesChange = event => {
    if (event.target.value > 10) {
      setNumberOfGames(10);
    } else {
      setNumberOfGames(event.target.value);
    }
  };

  return {
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
    handleNumberOfGamesChange
  };

}

export default useDivisionState;