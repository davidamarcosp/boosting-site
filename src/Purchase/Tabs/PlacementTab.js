import React from 'react';
import Grid from '@material-ui/core/Grid';
import NumberOfGamesForm from '../Components/NumberOfGamesForm';
import CurrentTierForm from '../Components/CurrentTierForm';
import CurrentTierBadge from '../Components/CurrentTierBadge';

function PlacementTab() {

  return (
    <Grid container>
      <Grid item xs={12} style={{ height: '200px' }}>
        <CurrentTierBadge />
      </Grid>
      <Grid item xs={12}>
        <CurrentTierForm />
      </Grid>
      <Grid item xs={12}>
        <NumberOfGamesForm />
      </Grid>
    </Grid>
  );
};

export default PlacementTab;