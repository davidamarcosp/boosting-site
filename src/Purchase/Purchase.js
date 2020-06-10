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
import SoloQueueTab from './Tabs/SoloQueueTab';
import PlacementTab from './Tabs/PlacementTab';
import ClashTab from './Tabs/ClashTab';

const TabPanel = (props) => {
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

const a11yProps = (index) => {
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

function Purchase() {

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleIndexChange = (index) => {
    setValue(index);
  };

  return (
    <div>
      <Navbar />
      <div className={classes.root}>
        <Container component="main" maxWidth="lg" disableGutters={true}>
          <Grid container style={{ marginTop: '3rem' }}>
            <Grid item xs={12} md={9} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
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
                  <Tab label="Duo Queue" {...a11yProps(1)} />
                  <Tab label="Placements" {...a11yProps(2)} />
                  <Tab label="Clash" {...a11yProps(3)} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleIndexChange}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <SoloQueueTab />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <SoloQueueTab />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <PlacementTab />
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                  <ClashTab />
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

export default Purchase;