import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

function ClashTab() {

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
  const [teamTier, setTeamTier] = React.useState(4);
  const [gameNumber, setGameNumber] = React.useState(1);
  const [boosterNumber, setBoosterNumber] = React.useState(1);

  const handleTeamTierChange = (event) => {
    setTeamTier(event.target.value);
  };

  const handleGameNumberChange = event => {
    if (event.target.value > 6) {
      setGameNumber(6);
    } else {
      setGameNumber(event.target.value);
    }
  };

  const handleBoosterNumberChange = event => {
    if (event.target.value > 4) {
      setBoosterNumber(4);
    } else {
      setBoosterNumber(event.target.value);
    }
  };


  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Team Tier</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={teamTier}
            onChange={handleTeamTierChange}
            label="Team Tier"
          >
            <MenuItem value={4}>IV</MenuItem>
            <MenuItem value={3}>III</MenuItem>
            <MenuItem value={2}>II</MenuItem>
            <MenuItem value={1}>I</MenuItem>
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
      <Grid item xs={12}>
        <TextField
          className={classes.formControl}
          id="outlined-number"
          label="# of Boosters"
          type="number"
          onChange={handleBoosterNumberChange}
          value={boosterNumber}
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

export default ClashTab;