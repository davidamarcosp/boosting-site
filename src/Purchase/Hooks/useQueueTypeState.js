import React from 'react';

function useQueueTypeState (initialValue) {

  const [queueType, setQueueType] = React.useState(initialValue);

  const handleQueueTypeChange = (event) => {
    setQueueType(event.target.value);
  };

  return {
    queueType,
    handleQueueTypeChange
  };

};

export default useQueueTypeState;