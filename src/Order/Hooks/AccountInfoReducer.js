const AccountInfoReducer = (state, action) => {
  switch (action.type) {
    case 'FIELD': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case 'SUBMIT': {
      return {
        ...state,
        isSaved: true,
      };
    }
    case 'SET_DATA': {
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        summoner: action.payload.summoner,
        isSaved: action.payload.isSaved,
      };
    }
    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  };
};

export default AccountInfoReducer;