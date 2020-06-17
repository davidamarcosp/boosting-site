import React from 'react';

function useQueueTypeState (initialValue) {

  const [queueType, setQueueType] = React.useState(initialValue);

  return {
    queueType,
    setQueueType
  };

};

export default useQueueTypeState;