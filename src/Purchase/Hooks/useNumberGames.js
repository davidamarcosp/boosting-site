import React from 'react';

function useNumberGames(initialValue) {

  const [numberOfGames, setNumberOfGames] = React.useState(initialValue);

  const handleNumberOfGamesChange = event => {
    if (event.target.value === 0 || event.target.value < 0) {
      setNumberOfGames(1);
    } else if (event.target.value > 10) {
      setNumberOfGames(10);
    } else {
      setNumberOfGames(event.target.value);
    }
  };

  return {
    numberOfGames,
    handleNumberOfGamesChange
  };

};

export default useNumberGames;