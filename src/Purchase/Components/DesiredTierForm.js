import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { getDesiredTier } from '../Utils/FormUtilities';
import { TierAndDivisionContext } from '../../Common/Context/TierAndDivisionContext';

function DesiredTierForm() {

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
    handleDesiredTierChange,
  } = React.useContext(TierAndDivisionContext);

  console.log('RENDER DESIRED TIER FORM');

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Desired Tier</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={desiredTier}
        onChange={handleDesiredTierChange}
        label="Desired Tier"
      >
        {getDesiredTier(currentTier, currentDivision)}
      </Select>
    </FormControl>
  );
};

export default DesiredTierForm;