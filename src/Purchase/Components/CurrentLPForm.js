import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { PurchaseContext } from '../../Common/Context/PurchaseContext';

function CurrentLPForm() {

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
    currentLP,
    handleCurrentLPChange
  } = React.useContext(PurchaseContext);

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">LP</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={currentLP}
        onChange={handleCurrentLPChange}
        label="LP"
      >
        <MenuItem value={0}>0 - 20</MenuItem>
        <MenuItem value={20}>20 - 40</MenuItem>
        <MenuItem value={40}>40 - 60</MenuItem>
        <MenuItem value={60}>60 - 80</MenuItem>
        <MenuItem value={80}>80 - 100</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CurrentLPForm;