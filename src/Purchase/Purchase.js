import React from 'react';
import Navbar from '../Common/Navbar/Navbar';
import Footer from '../Common/Footer/Footer';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import SoloQueueTab from './Tabs/SoloQueueTab';
import PlacementTab from './Tabs/PlacementTab';
import ClashTab from './Tabs/ClashTab';
import PurchaseOrder from './Utils/PurchaseOrder';
import LiveChat from '../Common/Zendesk/LiveChat';

//
import { CurrentLPProvider } from '../Common/Context/CurrentLPContext';

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
        <Box p={3}>{children}</Box>
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

function Purchase() {

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log('RENDER PURCHASE');

  return (
    <div>
      <Navbar />
      <Container component="main" maxWidth="lg" disableGutters={true}>
        <Grid container style={{ marginTop: '3rem' }}>
          <CurrentLPProvider>
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
                  <Tab label="Clash (soon)" {...a11yProps(3)} disabled />
                </Tabs>
              </AppBar>
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
              <Grid item xs={12} style={{ marginBottom: '10px' }}>
                <PurchaseOrder orderType={value} />
              </Grid>
            </Grid>
          </CurrentLPProvider>
        </Grid>
        <LiveChat />
      </Container>
      <Footer />
    </div>
  );
};

export default React.memo(Purchase);