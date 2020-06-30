import React from 'react';
import { TierAndDivisionProvider } from './TierAndDivisionContext';
import { CurrentLPProvider } from './CurrentLPContext';
import { QueueTypeProvider } from './QueueTypeContext';
import { NumberOfGamesProvider } from './NumberOfGamesContext';
import { RegionProvider } from './RegionContext';
import { ExtrasProvider } from './ExtrasContext';

function PurchaseContextProvider(props) {
  return (
    <ExtrasProvider>
      <TierAndDivisionProvider>
        <RegionProvider>
          <QueueTypeProvider>
            <NumberOfGamesProvider>
              <CurrentLPProvider>
                {props.children}
              </CurrentLPProvider>
            </NumberOfGamesProvider>
          </QueueTypeProvider>
        </RegionProvider>
      </TierAndDivisionProvider>
    </ExtrasProvider>
  );
};

export default PurchaseContextProvider;