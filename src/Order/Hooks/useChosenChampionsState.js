import React from 'react';

function useChosenChampionsState() {

  const [chosenChampions, setChosenChampions] = React.useState([]);

  return {
    chosenChampions,
    setChosenChampions
  };
}

export default useChosenChampionsState;