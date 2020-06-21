import React from 'react';

function useCurrentLPState (initialValue) {

  const [currentLP, setCurrentLP] = React.useState(initialValue);

  const handleCurrentLPChange = event => {
    setCurrentLP(event.target.value);
  };

  return {
    currentLP,
    handleCurrentLPChange
  };

};

export default useCurrentLPState;