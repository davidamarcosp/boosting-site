import React, { createContext } from "react";

export const ExtrasContext = createContext();

export const ExtrasProvider = (props) => {
  const [extras, setExtras] = React.useState({
    champAndRoles: false,
    priority: false,
    plusWin: false,
    streaming: false,
    coaching: false,
  });

  const handleExtrasChange = (event) => {
    setExtras({ ...extras, [event.target.name]: event.target.checked });
  };

  return (
    <ExtrasContext.Provider
      value={{
        extras,
        handleExtrasChange,
      }}
    >
      {props.children}
    </ExtrasContext.Provider>
  );
};