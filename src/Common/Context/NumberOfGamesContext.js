import React from 'react';

export const NumberOfGamesContext = React.createContext();

export const NumberOfGamesProvider = (props) => {

  const [numberOfGames, setNumberOfGames] = React.useState(1);

  const handleNumberOfGamesChange = event => {
    if (event.target.value === 0 || event.target.value < 0) {
      setNumberOfGames(1);
    } else if (event.target.value > 10) {
      setNumberOfGames(10);
    } else {
      setNumberOfGames(event.target.value);
    }
  };

  return (
    <NumberOfGamesContext.Provider
      value={{
        numberOfGames,
        handleNumberOfGamesChange
      }}
    >
      {props.children}
    </NumberOfGamesContext.Provider>
  );

};