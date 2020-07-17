import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ChampionPoolList from '../Components/ChampionPoolList';
import ChosenChampionList from '../Components/ChosenChampionList';
import RolesCheckboxes from '../Components/RolesCheckboxes';
import PreferencesButton from '../Components/PreferencesButton';

function ChampionsAndRolesTab(props) {

  const { order_id } = props;

  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={12} style={{ padding: '0px' }}>
          <Typography variant="h6" align="center" style={{ marginBottom: '15px' }}> Setup your preferences </Typography>
        </Grid>
        <Grid item xs={3} md={2}>
          <RolesCheckboxes order_id={order_id} />
        </Grid>
        <Grid item xs={4} md={4}>
          <ChampionPoolList />
        </Grid>
        <Grid item xs={4} md={4}>
          <ChosenChampionList order_id={order_id} />
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={8} md={4}>
          <PreferencesButton order_id={order_id} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ChampionsAndRolesTab;

