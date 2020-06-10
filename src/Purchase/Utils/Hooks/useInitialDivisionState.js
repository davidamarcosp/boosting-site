import React from 'react';

function useInitialDivisionState (initialValue) {

  const [division, setDivision] = React.useState(initialValue);

  return {
    division,
    setDivision
  };

};

export default useInitialDivisionState;