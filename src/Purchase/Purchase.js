import React from 'react';
import Navbar from '../Common/Navbar/Navbar';
import Footer from '../Common/Footer/Footer';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SoloQueueTab from './Tabs/SoloQueueTab';
import PlacementTab from './Tabs/PlacementTab';
import ClashTab from './Tabs/ClashTab';
import PurchaseOrder from './Utils/PurchaseOrder';
import LiveChat from '../Common/Zendesk/LiveChat';
import { CurrentLPProvider } from '../Common/Context/CurrentLPContext';
import TabPanel from '@material-ui/lab/TabPanel';
import TabContext from '@material-ui/lab/TabContext';



function Purchase() {

  const theme = useTheme();
  const [value, setValue] = React.useState("SOLO_QUEUE");

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
              <TabContext value={value}>
                <AppBar position="static" color="default">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                  >
                    <Tab label="Solo Queue" value="SOLO_QUEUE" />
                    <Tab label="Duo Queue" value="DUO_QUEUE" />
                    <Tab label="Placements" value="PLACEMENT" />
                    <Tab label="Clash (soon)" value="CLASH" disabled />
                  </Tabs>
                </AppBar>
                <TabPanel value="SOLO_QUEUE" dir={theme.direction}>
                  <SoloQueueTab />
                </TabPanel>
                <TabPanel value="DUO_QUEUE" dir={theme.direction}>
                  <SoloQueueTab />
                </TabPanel>
                <TabPanel value="PLACEMENT" dir={theme.direction}>
                  <PlacementTab />
                </TabPanel>
                <TabPanel value="CLASH" dir={theme.direction}>
                  <ClashTab />
                </TabPanel>
              </TabContext>
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

export default Purchase;