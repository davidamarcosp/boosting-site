import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { NumberOfGamesContext } from '../../Common/Context/NumberOfGamesContext';

function NumberOfGamesForm() {

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

  const { numberOfGames, handleNumberOfGamesChange } = React.useContext(NumberOfGamesContext);
  const classes = useStyles();

  console.log('RENDER NUMBER OF GAMES FORM');

  return (
    <TextField
      className={classes.formControl}
      id="outlined-number"
      label="# of Games"
      type="number"
      onChange={handleNumberOfGamesChange}
      value={numberOfGames}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{ min: 1, step: 1, style: { textAlign: 'center' } }}
      variant="outlined"
    />
  );
};

export default NumberOfGamesForm;