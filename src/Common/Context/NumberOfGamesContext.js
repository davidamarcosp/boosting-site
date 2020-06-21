import React from 'react';
import useNumberOfGames from '../../Purchase/Hooks/useNumberGames';

export const NumberOfGamesContext = React.createContext();

export const NumberOfGamesProvider = (props) => {

  const { numberOfGames, handleNumberOfGamesChange } = useNumberOfGames(1);

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