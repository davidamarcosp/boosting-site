import React from 'react';

function useRolesState() {

  const [roles, setRoles] = React.useState({
    top: false,
    jungle: false,
    mid: false,
    support: false,
    adc: false
  });

  return {
    roles,
    setRoles
  };
}

export default useRolesState;