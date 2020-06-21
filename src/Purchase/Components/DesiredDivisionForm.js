import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { getDesiredDivision } from '../Utils/FormUtilities';
import { TierAndDivisionContext } from '../../Common/Context/TierAndDivisionContext';

function DesiredDivisionForm() {

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
    currentTier,
    currentDivision,
    desiredTier,
    desiredDivision,
    handleDesiredDivisionChange
  } = React.useContext(TierAndDivisionContext);

  console.log('RENDER DESIRED DIVISION FORM');

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Desired Division</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={desiredDivision}
        onChange={handleDesiredDivisionChange}
        label="Desired Division"
      >
        {getDesiredDivision(currentTier, desiredTier, currentDivision)}
      </Select>
    </FormControl>
  );
};

export default React.memo(DesiredDivisionForm);