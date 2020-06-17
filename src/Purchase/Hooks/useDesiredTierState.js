import React from 'react';

function useDesiredTierState (initialValue) {

  const [desiredTier, setDesiredTier] = React.useState(initialValue);

  return {
    desiredTier,
    setDesiredTier
  };

};

export default useDesiredTierState;