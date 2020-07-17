import React from 'react';
// import Firebase from '../../Firebase';
import ProgressBadge from '../Components/ProgressBadge';
import MatchHistory from '../Components/MatchHistory';
import Grid from '@material-ui/core/Grid';

function ProgressTab(props) {

  const { order_id } = props;

  return (
    <Grid container justify="space-around">
      <Grid item xs={5}>
        <ProgressBadge order_id={order_id} />
      </Grid>
      <Grid item xs={5}>
        <MatchHistory order_id={order_id} />
      </Grid>
    </Grid>
  );
}

export default ProgressTab;