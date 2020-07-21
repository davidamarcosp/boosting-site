import React, { createContext } from "react";

export const RegionContext = createContext();

export const RegionProvider = (props) => {

  const [region, setRegion] = React.useState('NA1');

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  return (
    <RegionContext.Provider
      value={{
        region,
        handleRegionChange
      }}
    >
      {props.children}
    </RegionContext.Provider>
  );

};