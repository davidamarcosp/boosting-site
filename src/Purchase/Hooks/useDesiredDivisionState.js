import React from 'react';

function useDesiredDivisionState (initialValue) {

  const [desiredDivision, setDesiredDivision] = React.useState(initialValue);

  return {
    desiredDivision,
    setDesiredDivision
  };

};

export default useDesiredDivisionState;