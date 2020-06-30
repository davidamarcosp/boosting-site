import React from 'react';

function useRegionState (initialValue) {

  const [region, setRegion] = React.useState(initialValue);

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  return {
    region,
    handleRegionChange
  };

};

export default useRegionState;