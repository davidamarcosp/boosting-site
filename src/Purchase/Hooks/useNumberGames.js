import React from 'react';

function useNumberGames (initialValue) {

  const [numberOfGames, setNumberOfGames] = React.useState(initialValue);

  return {
    numberOfGames,
    setNumberOfGames
  };

};

export default useNumberGames;