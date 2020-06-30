import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { QueueTypeContext } from '../../Common/Context/QueueTypeContext';
import CurrentTierBadge from '../Components/CurrentTierBadge';
import DesiredTierBadge from '../Components/DesiredTierBadge';
import CurrentTierForm from '../Components/CurrentTierForm';
import CurrentDivisionForm from '../Components/CurrentDivisionForm';
import CurrentLPForm from '../Components/CurrentLPForm';
import DesiredTierForm from '../Components/DesiredTierForm';
import DesiredDivisionForm from '../Components/DesiredDivisionForm';
import NumberOfGamesForm from '../Components/NumberOfGamesForm';
import RegionForm from '../Components/RegionForm';

function SoloQueueTab() {

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: '100%',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: '60%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const {
    queueType,
    handleQueueTypeChange
  } = React.useContext(QueueTypeContext);

  const getSection = (queueType) => {
    if (queueType === "Division") return divisionSection;
    if (queueType === "Wins") return winSection;
    if (queueType === "Ranked Games") return rankedGameSection;
    if (queueType === "Normal Games") return normalGameSection;
  };

  const divisionSection = (
    <Grid container>
      <Grid item xs={6} style={{ height: '200px' }}>
        <CurrentTierBadge />
      </Grid>
      <Grid item xs={6} style={{ height: '200px' }}>
        <DesiredTierBadge />
      </Grid>
      <Grid item xs={6}>
        <CurrentTierForm />
        <CurrentDivisionForm />
        <CurrentLPForm />
      </Grid>
      <Grid item xs={6}>
        <DesiredTierForm />
        <DesiredDivisionForm />
      </Grid>
    </Grid >
  );

  const winSection = (
    <Grid container>
      <Grid item xs={12} style={{ height: '200px' }}>
        <CurrentTierBadge />
      </Grid>
      <Grid item xs={12}>
        <CurrentTierForm />
      </Grid>
      <Grid item xs={6}>
        <CurrentDivisionForm />
      </Grid>
      <Grid item xs={6}>
        <NumberOfGamesForm />
      </Grid>
    </Grid>
  );

  const rankedGameSection = (
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

  const normalGameSection = (
    <Grid container>
      <Grid item xs={12} style={{ height: '200px' }}>
        <CurrentTierBadge />
      </Grid>
      <Grid item xs={12}>
        <NumberOfGamesForm />
      </Grid>
    </Grid>
  );

  console.log('RENDER SOLO Q TAB');

  return (
    <Grid container>
      <Grid item xs={12}>
        <RegionForm />
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={queueType}
            onChange={handleQueueTypeChange}
            label="Type"
          >
            <MenuItem value="Division">Division</MenuItem>
            <MenuItem value="Wins">Wins</MenuItem>
            <MenuItem value="Ranked Games">Ranked Games</MenuItem>
            <MenuItem value="Normal Games">Normal Games</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {getSection(queueType)}
    </Grid>
  );
};

export default SoloQueueTab;