import React from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useTierState from '../Utils/Hooks/useTierState';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

function PlacementTab() {

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
  const { tier, setTier } = useTierState(1);
  const [gameNumber, setGameNumber] = React.useState(1);

  const handleTierChange = (event) => {
    setTier(event.target.value);
  };

  const handleGameNumberChange = event => {
    if (event.target.value > 10) {
      setGameNumber(10);
    } else {
      setGameNumber(event.target.value);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Last Season Tier</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={tier}
            onChange={handleTierChange}
            label="Last Season Tier"
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
};

export default PlacementTab;