import React from 'react';
import { TierAndDivisionProvider } from './TierAndDivisionContext';
import { CurrentLPProvider } from './CurrentLPContext';
import { QueueTypeProvider } from './QueueTypeContext';
import { NumberOfGamesProvider } from './NumberOfGamesContext';

function AsdContextProvider(props) {
  return (
    <TierAndDivisionProvider>
      <QueueTypeProvider>
        <NumberOfGamesProvider>
          <CurrentLPProvider>
            {props.children}
          </CurrentLPProvider>
        </NumberOfGamesProvider>
      </QueueTypeProvider>
    </TierAndDivisionProvider>
  );
};

export default AsdContextProvider;