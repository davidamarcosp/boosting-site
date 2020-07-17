import React from 'react';
import useRolesState from './useRolesState';
import useChosenChampionsState from './useChosenChampionsState';

export const RolesContext = React.createContext();
export const ChosenChampsContext = React.createContext();

const RolesProvider = props => {

  const { roles, setRoles } = useRolesState();

  return (
    <RolesContext.Provider
      value={{
        roles,
        setRoles
      }}
    >
      {props.children}
    </RolesContext.Provider>
  );

};

const ChosenChampsProvider = props => {

  const { chosenChampions, setChosenChampions } = useChosenChampionsState();
  const [isSaved, setSaved] = React.useState(false);

  return (
    <ChosenChampsContext.Provider
      value={{
        isSaved,
        setSaved,
        chosenChampions,
        setChosenChampions
      }}
    >
      {props.children}
    </ChosenChampsContext.Provider>
  );

}

export const PreferencesProvider = props => {
  return (
    <ChosenChampsProvider>
      <RolesProvider>
        {props.children}
      </RolesProvider>
    </ChosenChampsProvider>
  )
};