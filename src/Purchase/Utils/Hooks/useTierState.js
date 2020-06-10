import React from 'react';

function useTierState (initialValue) {

  const [tier, setTier] = React.useState(initialValue);

  return {
    tier,
    setTier
  };

};

export default useTierState;