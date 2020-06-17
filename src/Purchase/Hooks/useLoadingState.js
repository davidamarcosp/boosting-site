import React from 'react';

function useLoadingState (initialValue) {

  const [loading, setLoading] = React.useState(initialValue);

  return {
    loading,
    setLoading
  };

};

export default useLoadingState;