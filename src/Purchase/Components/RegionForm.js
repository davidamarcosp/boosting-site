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
        <MenuItem value="NA">NA</MenuItem>
        <MenuItem value="EUW">EUW</MenuItem>
        <MenuItem value="EUNE">EUNE</MenuItem>
        <MenuItem value="LAN">LAN</MenuItem>
        <MenuItem value="LAS">LAS</MenuItem>
        <MenuItem value="BR">BR</MenuItem>
        <MenuItem value="TR">TR</MenuItem>
        <MenuItem value="RU">RU</MenuItem>
        <MenuItem value="OCE">OCE</MenuItem>
      </Select>
    </FormControl>
  );
}

export default RegionForm;