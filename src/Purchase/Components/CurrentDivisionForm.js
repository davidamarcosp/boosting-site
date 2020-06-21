import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { TierAndDivisionContext } from '../../Common/Context/TierAndDivisionContext';

function CurrentDivisionForm() {

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
    handleCurrentDivisionChange,
  } = React.useContext(TierAndDivisionContext);

  console.log('RENDER CURRENT DIVISION FORM');

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Division</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={currentDivision}
        onChange={handleCurrentDivisionChange}
        label="Division"
      >
        {
          currentTier === 5
            ? [<MenuItem key={0} value={0}>IV</MenuItem>,
            <MenuItem key={1} value={1}>III</MenuItem>,
            <MenuItem key={2} value={2}>II</MenuItem>]
            : [<MenuItem key={0} value={0}>IV</MenuItem>,
            <MenuItem key={1} value={1}>III</MenuItem>,
            <MenuItem key={2} value={2}>II</MenuItem>,
            <MenuItem key={3} value={3}>I</MenuItem>]
        }
      </Select>
    </FormControl>
  );
};

export default CurrentDivisionForm;