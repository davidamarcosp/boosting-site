import React from 'react';
import useQueueTypeState from '../../Purchase/Hooks/useQueueTypeState';

export const QueueTypeContext = React.createContext();

export const QueueTypeProvider = (props) => {

  const { queueType, handleQueueTypeChange } = useQueueTypeState("Division");

  return (
    <QueueTypeContext.Provider
      value={{
        queueType,
        handleQueueTypeChange
      }}
    >
      {props.children}
    </QueueTypeContext.Provider>
  );

};