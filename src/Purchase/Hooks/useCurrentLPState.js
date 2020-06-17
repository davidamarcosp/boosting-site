import React from 'react';

function useCurrentLPState (initialValue) {

  const [currentLP, setCurrentLP] = React.useState(initialValue);

  return {
    currentLP,
    setCurrentLP
  };

};

export default useCurrentLPState;