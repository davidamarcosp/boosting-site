import React from 'react';

function useCurrentTierState (initialValue) {

  const [currentTier, setCurrentTier] = React.useState(initialValue);

  return {
    currentTier,
    setCurrentTier
  };

};

export default useCurrentTierState;