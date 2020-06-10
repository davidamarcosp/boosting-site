import React from 'react';

function useLPState (initialValue) {

  const [LP, setLP] = React.useState(initialValue);

  return {
    LP,
    setLP
  };

};

export default useLPState;