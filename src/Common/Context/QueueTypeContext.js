import React from 'react';

export const QueueTypeContext = React.createContext();

export const QueueTypeProvider = (props) => {

  const [queueType, setQueueType] = React.useState('Division');

  const handleQueueTypeChange = (event) => {
    setQueueType(event.target.value);
  };

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