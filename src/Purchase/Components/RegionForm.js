import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { RegionContext } from '../../Common/Context/RegionContext';

function RegionForm() {

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
  const { region, handleRegionChange } = React.useContext(RegionContext);

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Region</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={region}
        onChange={handleRegionChange}
        label="Region"
      >
        <MenuItem value="NA1">NA</MenuItem>
        <MenuItem value="EUW1">EUW</MenuItem>
        <MenuItem value="EUN1">EUNE</MenuItem>
        <MenuItem value="LA1">LAN</MenuItem>
        <MenuItem value="LA2">LAS</MenuItem>
        <MenuItem value="BR1">BR</MenuItem>
        <MenuItem value="TR1">TR</MenuItem>
        <MenuItem value="RU">RU</MenuItem>
        <MenuItem value="OC1">OCE</MenuItem>
      </Select>
    </FormControl>
  );
}

export default RegionForm;