import React, { useReducer, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ChampionPoolList from '../Components/ChampionPoolList';
import ChosenChampionList from '../Components/ChosenChampionList';
import RolesCheckboxes from '../Components/RolesCheckboxes';
import Button from '@material-ui/core/Button';
import ChampionsAndRolesReducer from '../Hooks/ChampionsAndRolesReducer';
import Firebase from '../../Firebase';

const initialState = {
  roles: {
    top: false,
    jungle: false,
    mid: false,
    support: false,
    adc: false
  },
  chosenChampions: [],
  isSaved: false
};

function ChampionsAndRolesTab(props) {

  const { order_id } = props;
  const [state, dispatch] = useReducer(ChampionsAndRolesReducer, initialState);
  const { roles, chosenChampions, isSaved } = state;

  const handleSaved = () => {
    Firebase.doSetPreferences(order_id, roles, chosenChampions);
    dispatch({ type: 'SUBMIT', payload: true })
  };

  useEffect(() => {
    Firebase.getPreferences(order_id)
      .then((doc) => {
        if (doc.exists && doc.data().preferences) {
          const { champions, roles, saved } = doc.data().preferences;
          dispatch({
            type: 'SET_DATA',
            payload: {
              roles: roles,
              chosenChampions: champions,
              isSaved: saved
            }
          });
        };
      }).catch(err => console.log(err));
  }, [order_id]);

  return (
    <Grid container>
      <Grid container justify="center">
        <Grid item xs={12} style={{ padding: '0px' }}>
          <Typography variant="h6" align="center" style={{ marginBottom: '15px' }}> Setup your preferences </Typography>
        </Grid>
        <Grid item xs={3} md={2}>
          <RolesCheckboxes state={state} dispatch={dispatch} />
        </Grid>
        <Grid item xs={4} md={4}>
          <ChampionPoolList state={state} dispatch={dispatch} />
        </Grid>
        <Grid item xs={4} md={4}>
          <ChosenChampionList state={state} dispatch={dispatch} />
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={8} md={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSaved}
            disabled={isSaved || chosenChampions.length < 8}
            style={{ marginTop: '24px' }}
          >
            {isSaved ? 'Saved' : 'Submit'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChampionsAndRolesTab;