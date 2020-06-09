import React from 'react';
import Navbar from '../Common/Navbar/Navbar';
import Footer from '../Common/Footer/Footer';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

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

const getDesiredTier = (tier, division) => {
  if (tier === 1) {
    if (division === 1) {
      return [
        <MenuItem value={2}>Silver</MenuItem>,
        <MenuItem value={3}>Gold</MenuItem>,
        <MenuItem value={4}>Platinum</MenuItem>,
        <MenuItem value={5}>Diamond</MenuItem>
      ];
    } else {
      return [
        <MenuItem value={1}>Iron</MenuItem>,
        <MenuItem value={2}>Silver</MenuItem>,
        <MenuItem value={3}>Gold</MenuItem>,
        <MenuItem value={4}>Platinum</MenuItem>,
        <MenuItem value={5}>Diamond</MenuItem>
      ];
    }
  } else if (tier === 2) {
    if (division === 1) {
      return [
        <MenuItem value={3}>Gold</MenuItem>,
        <MenuItem value={4}>Platinum</MenuItem>,
        <MenuItem value={5}>Diamond</MenuItem>
      ];
    } else {
      return [
        <MenuItem value={2}>Silver</MenuItem>,
        <MenuItem value={3}>Gold</MenuItem>,
        <MenuItem value={4}>Platinum</MenuItem>,
        <MenuItem value={5}>Diamond</MenuItem>
      ];
    }
  } else if (tier === 3) {
    if (division === 1) {
      return [
        <MenuItem value={4}>Platinum</MenuItem>,
        <MenuItem value={5}>Diamond</MenuItem>
      ];
    } else {
      return [
        <MenuItem value={3}>Gold</MenuItem>,
        <MenuItem value={4}>Platinum</MenuItem>,
        <MenuItem value={5}>Diamond</MenuItem>
      ];
    }
  } else if (tier === 4) {
    if (division === 1) {
      return [
        <MenuItem value={5}>Diamond</MenuItem>
      ];
    } else {
      return [
        <MenuItem value={4}>Platinum</MenuItem>,
        <MenuItem value={5}>Diamond</MenuItem>
      ];
    }
  } else if (tier === 5) {
    return [
      <MenuItem value={5}>Diamond</MenuItem>
    ];
  }
};

const getDesiredDivision = (tier, finalTier, division) => {
  if (tier === finalTier) {
    if (division === 2) {
      return [
        <MenuItem value={1}>I</MenuItem>
      ];
    } else if (division === 3) {
      return [
        <MenuItem value={1}>I</MenuItem>,
        <MenuItem value={2}>II</MenuItem>
      ];
    } else if (division === 4) {
      return [
        <MenuItem value={1}>I</MenuItem>,
        <MenuItem value={2}>II</MenuItem>,
        <MenuItem value={3}>III</MenuItem>
      ];
    };
  } else {
    return [
      <MenuItem value={1}>I</MenuItem>,
      <MenuItem value={2}>II</MenuItem>,
      <MenuItem value={3}>III</MenuItem>,
      <MenuItem value={4}>IV</MenuItem>
    ];
  };
};
//

function Purchase1() {

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [queueType, setQueueType] = React.useState('Division');
  const [tier, setTier] = React.useState(1);
  const [division, setDivision] = React.useState(4);
  const [LP, setLP] = React.useState('0-20');
  const [finalTier, setFinalTier] = React.useState(1);
  const [finalDivision, setFinalDivision] = React.useState(3);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleChangeSelect = event => {
    setQueueType(event.target.value);
  };

  const handleChangeSelect1 = event => {
    setTier(event.target.value);
    if (event.target.value === 5 && division === 1) {
      setDivision(2);
      setFinalTier(5);
      setFinalDivision(1);
    } else if (event.target.value > finalTier && division === 1) {
      setFinalTier(event.target.value + 1);
    } else if (event.target.value > finalTier && division < finalDivision) {
      setFinalTier(event.target.value);
      setFinalDivision(division - 1);
    } else if (event.target.value > finalTier) {
      setFinalTier(event.target.value);
    } else if (event.target.value === finalTier && division === 1) {
      setFinalTier(event.target.value + 1);
      setFinalDivision(4);
    } else if (event.target.value === finalTier && division <= finalDivision) {
      setFinalDivision(division - 1);
    }
  };

  const handleChangeSelect2 = event => {
    setDivision(event.target.value);
    if (tier === finalTier && event.target.value === 1) {
      setFinalTier(tier + 1);
      setFinalDivision(4);
    } else if (tier === finalTier && event.target.value <= finalDivision) {
      setFinalDivision(event.target.value - 1);
    }
  };

  const handleChangeSelect3 = event => {
    setLP(event.target.value);
  };

  const handleChangeSelect4 = event => {
    setFinalTier(event.target.value);
    if (event.target.value === tier && division < finalDivision) {
      setFinalDivision(division - 1);
    }
  };

  const handleChangeSelect5 = event => {
    setFinalDivision(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className={classes.root}>
        <Container component="main" maxWidth="lg" disableGutters={true}>
          <Grid container style={{ marginTop: '3rem' }}>
            <Grid item xs={12} md={8}>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="Solo Queue" {...a11yProps(0)} />
                  <Tab label="Due Queue" {...a11yProps(1)} />
                  <Tab label="Placements" {...a11yProps(2)} />
                  <Tab label="Clash" {...a11yProps(3)} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  {}
                  <Grid container>
                    <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={queueType}
                          onChange={handleChangeSelect}
                          label="Type"
                        >
                          <MenuItem value="Division">Division</MenuItem>
                          <MenuItem value="Wins">Wins</MenuItem>
                          <MenuItem value="Games">Games</MenuItem>
                          <MenuItem value="Normal Games">Normal Games</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  {queueType === 'Division' &&
                    <Grid container>
                      <Grid item xs={6}>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel id="demo-simple-select-outlined-label">Tier</InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={tier}
                            onChange={handleChangeSelect1}
                            label="Tier"
                          >
                            <MenuItem value={1}>Iron</MenuItem>
                            <MenuItem value={2}>Silver</MenuItem>
                            <MenuItem value={3}>Gold</MenuItem>
                            <MenuItem value={4}>Platinum</MenuItem>
                            <MenuItem value={5}>Diamond</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel id="demo-simple-select-outlined-label">Division</InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={division}
                            onChange={handleChangeSelect2}
                            label="Division"
                          >
                            {tier === 5
                              ? [<MenuItem value={4}>IV</MenuItem>,
                              <MenuItem value={3}>III</MenuItem>,
                              <MenuItem value={2}>II</MenuItem>]
                              : [<MenuItem value={4}>IV</MenuItem>,
                              <MenuItem value={3}>III</MenuItem>,
                              <MenuItem value={2}>II</MenuItem>,
                              <MenuItem value={1}>I</MenuItem>]
                            }
                          </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel id="demo-simple-select-outlined-label">LP</InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={LP}
                            onChange={handleChangeSelect3}
                            label="LP"
                          >
                            <MenuItem value="0-20">0 - 20</MenuItem>
                            <MenuItem value="20-40">20 - 40</MenuItem>
                            <MenuItem value="40-60">40 - 60</MenuItem>
                            <MenuItem value="60-80">60 - 80</MenuItem>
                            <MenuItem value="80-100">80 - 100</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel id="demo-simple-select-outlined-label">Desired Tier</InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={finalTier}
                            onChange={handleChangeSelect4}
                            label="Desired Tier"
                          >
                            {getDesiredTier(tier, division)}
                          </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel id="demo-simple-select-outlined-label">Desired Division</InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={finalDivision}
                            onChange={handleChangeSelect5}
                            label="Desired Division"
                          >
                            {getDesiredDivision(tier, finalTier, division)}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  }
                  {}
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                </TabPanel>
              </SwipeableViews>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Purchase1;