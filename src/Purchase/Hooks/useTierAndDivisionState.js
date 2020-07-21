import React from 'react';

const useTierAndDivisionState = () => {

  const [currentTier, setCurrentTier] = React.useState(2);
  const [currentDivision, setCurrentDivision] = React.useState(3);
  const [desiredTier, setDesiredTier] = React.useState(3);
  const [desiredDivision, setDesiredDivision] = React.useState(0);

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