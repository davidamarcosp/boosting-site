import React from 'react';
import useCurrentTierState from './useCurrentTierState';
import useCurrentDivisionState from './useCurrentDivisionState';
import useDesiredTierState from './useDesiredTierState';
import useDesiredDivisionState from './useDesiredDivisionState';

const useTierAndDivisionState = () => {

  const { currentTier, setCurrentTier } = useCurrentTierState(2);
  const { currentDivision, setCurrentDivision } = useCurrentDivisionState(3);
  const { desiredTier, setDesiredTier } = useDesiredTierState(3);
  const { desiredDivision, setDesiredDivision } = useDesiredDivisionState(0);

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
      setDesiredDivision,
    ]
  );

  const handleCurrentTierChange = event => {
    setCurrentTier(event.target.value);
  };

  const handleCurrentDivisionChange = event => {
    setCurrentDivision(event.target.value);
  };

  const handleDesiredTierChange = event => {
    setDesiredTier(event.target.value);
  };

  const handleDesiredDivisionChange = event => {
    setDesiredDivision(event.target.value);
  };

  return {
    currentTier,
    handleCurrentTierChange,
    currentDivision,
    handleCurrentDivisionChange,
    desiredTier,
    handleDesiredTierChange,
    desiredDivision,
    handleDesiredDivisionChange,
  };

}

export default useTierAndDivisionState;