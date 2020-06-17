import React from 'react';

function useCurrentDivisionState (initialValue) {

  const [currentDivision, setCurrentDivision] = React.useState(initialValue);

  return {
    currentDivision,
    setCurrentDivision
  };

};

export default useCurrentDivisionState;