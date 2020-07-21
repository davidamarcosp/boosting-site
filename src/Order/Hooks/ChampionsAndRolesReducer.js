const ChampionsAndRolesReducer = (state, action) => {
  switch (action.type) {
    case "CHECK":
      return {
        ...state,
        roles: {
          ...state.roles, [action.fieldName]: action.payload
        }
      };
    case "CHOOSE_CHAMPION":
      return {
        ...state,
        chosenChampions: [...new Set([...state.chosenChampions, action.payload])]
      };
    case "DELETE_CHAMPION":
      return {
        ...state,
        chosenChampions: state.chosenChampions.filter(champ => {
          return champ.toUpperCase() !== action.payload.toUpperCase();
        })
      };
    case "SUBMIT":
      return {
        ...state,
        isSaved: true
      }
    case "SET_DATA":
      return {
        ...state,
        roles: action.payload.roles,
        chosenChampions: action.payload.chosenChampions,
        isSaved: action.payload.isSaved
      }
    default:
      return state;
  };
};

export default ChampionsAndRolesReducer;