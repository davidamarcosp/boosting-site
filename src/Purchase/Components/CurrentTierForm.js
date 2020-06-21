import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { TierAndDivisionContext } from '../../Common/Context/TierAndDivisionContext';

function CurrentTierForm() {

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
    handleCurrentTierChange,
  } = React.useContext(TierAndDivisionContext);

  console.log('RENDER CURRENT TIER FORM');

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Tier</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={currentTier}
        onChange={handleCurrentTierChange}
        label="Tier"
      >
        <MenuItem value={0}>Iron</MenuItem>
        <MenuItem value={1}>Bronze</MenuItem>
        <MenuItem value={2}>Silver</MenuItem>
        <MenuItem value={3}>Gold</MenuItem>
        <MenuItem value={4}>Platinum</MenuItem>
        <MenuItem value={5}>Diamond</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CurrentTierForm;
