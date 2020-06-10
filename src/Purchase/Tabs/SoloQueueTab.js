import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { getDesiredTier, getDesiredDivision } from '../Utils/FormUtilities';
import useDivisionState from '../Utils/useDivisionState';

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
  const [queueType, setQueueType] = React.useState('Division');
  const [gameNumber, setGameNumber] = React.useState(1);

  const {
    tier,
    desiredTier,
    division,
    desiredDivision,
    LP,
    handleTierChange,
    handleDivisionChange,
    handleLPChange,
    handleDesiredTierChange,
    handleDesiredDivisionChange
  } = useDivisionState();

  const handleChangeSelect = event => {
    setQueueType(event.target.value);
  };

  const handleGameNumberChange = event => {
    if (event.target.value >= 100) {
      setGameNumber(100);
    } else {
      setGameNumber(event.target.value);
    }
  };

  const getSection = (queueType) => {
    if (queueType === "Division") return divisionSection;
    if (queueType === "Wins") return winSection;
    if (queueType === "Ranked Games") return rankedGameSection;
    if (queueType === "Normal Games") return normalGameSection;
  };

  const divisionSection = (
    <Grid container>
      <Grid item xs={6}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Tier</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={tier}
            onChange={handleTierChange}
            label="Tier"
          >
            <MenuItem value={1}>Iron</MenuItem>
            <MenuItem value={2}>Silver</MenuItem>
            <MenuItem value={3}>Gold</MenuItem>
            <MenuItem value={4}>Platinum</MenuItem>
            <MenuItem value={5}>Diamond</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Division</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={division}
            onChange={handleDivisionChange}
            label="Division"
          >
            {tier === 5
              ? [<MenuItem value={4}>IV</MenuItem>,
              <MenuItem value={3}>III</MenuItem>,
              <MenuItem value={2}>II</MenuItem>]
              : [<MenuItem value={4}>IV</MenuItem>,
              <MenuItem value={3}>III</MenuItem>,
              <MenuItem value={2}>II</MenuItem>,
              <MenuItem value={1}>I</MenuItem>]
            }
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">LP</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={LP}
            onChange={handleLPChange}
            label="LP"
          >
            <MenuItem value="0-20">0 - 20</MenuItem>
            <MenuItem value="20-40">20 - 40</MenuItem>
            <MenuItem value="40-60">40 - 60</MenuItem>
            <MenuItem value="60-80">60 - 80</MenuItem>
            <MenuItem value="80-100">80 - 100</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Desired Tier</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={desiredTier}
            onChange={handleDesiredTierChange}
            label="Desired Tier"
          >
            {getDesiredTier(tier, division)}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Desired Division</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={desiredDivision}
            onChange={handleDesiredDivisionChange}
            label="Desired Division"
          >
            {getDesiredDivision(tier, desiredTier, division)}
          </Select>
        </FormControl>
      </Grid>
    </Grid >
  );

  const winSection = (
    <Grid container>
      <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Tier</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={tier}
            onChange={handleTierChange}
            label="Tier"
          >
            <MenuItem value={1}>Iron</MenuItem>
            <MenuItem value={2}>Silver</MenuItem>
            <MenuItem value={3}>Gold</MenuItem>
            <MenuItem value={4}>Platinum</MenuItem>
            <MenuItem value={5}>Diamond</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Division</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={division}
            onChange={handleDivisionChange}
            label="Division"
          >
            <MenuItem value={4}>IV</MenuItem>
            <MenuItem value={3}>III</MenuItem>
            <MenuItem value={2}>II</MenuItem>
            <MenuItem value={1}>I</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          className={classes.formControl}
          id="outlined-number"
          label="# of Games"
          type="number"
          onChange={handleGameNumberChange}
          value={gameNumber}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ min: 1, step: 1, style: { textAlign: 'center' } }}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );

  const rankedGameSection = (
    <Grid container>
      <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Tier</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={tier}
            onChange={handleTierChange}
            label="Tier"
          >
            <MenuItem value={1}>Iron</MenuItem>
            <MenuItem value={2}>Silver</MenuItem>
            <MenuItem value={3}>Gold</MenuItem>
            <MenuItem value={4}>Platinum</MenuItem>
            <MenuItem value={5}>Diamond</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          className={classes.formControl}
          id="outlined-number"
          label="# of Games"
          type="number"
          onChange={handleGameNumberChange}
          value={gameNumber}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ min: 1, step: 1, style: { textAlign: 'center' } }}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );

  const normalGameSection = (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          className={classes.formControl}
          id="outlined-number"
          label="# of Games"
          type="number"
          onChange={handleGameNumberChange}
          value={gameNumber}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ min: 1, step: 1, style: { textAlign: 'center' } }}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={queueType}
            onChange={handleChangeSelect}
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