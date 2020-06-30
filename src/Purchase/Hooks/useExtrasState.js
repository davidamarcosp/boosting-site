import React from 'react';

function useExtrasState(initialValue) {

  const [extras, setExtras] = React.useState({
    champAndRoles: initialValue,
    priority: initialValue,
    plusWin: initialValue,
    streaming: initialValue,
    coaching: initialValue
  });

  const handleExtrasChange = (event) => {
    setExtras({ ...extras, [event.target.name]: event.target.checked });
  };

  return {
    extras,
    handleExtrasChange
  };

};

export default useExtrasState;