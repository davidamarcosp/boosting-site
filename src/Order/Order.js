import React, { useState, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Firebase from '../Firebase';
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Messenger from './Components/Messenger';
import { AuthContext } from '../Common/Context/AuthContext';
import Navbar from '../Common/Navbar/Navbar';
import TabPanel from '@material-ui/lab/TabPanel';
import TabContext from '@material-ui/lab/TabContext';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChampionsAndRolesTab from './Tabs/ChampionsAndRolesTab';
import AccountInfoTab from './Tabs/AccountInfoTab';
import Footer from '../Common/Footer/Footer';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import OrderDetails from './Components/OrderDetails';
import { makeStyles } from '@material-ui/core/styles';
import OrderTimeline from './Components/OrderTimeline'

const useStyles = makeStyles((theme) => ({
  ChampionAndRolesTab: {
    padding: '20px 0px',
    [theme.breakpoints.up('md')]: {
      padding: '24px',
    }
  },
  ChampionAndRolesInfoIcon: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    left: '95%',
    color: 'gray'
  }
}));

function Order(props) {

  const classes = useStyles();
  const order_id = props.match.params.id;
  const [isAvailable, setAvailable] = useState(true);
  const [value, setValue] = useState("SOLO_QUEUE");
  const { authUser } = useContext(AuthContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    Firebase.getPreferences(order_id)
      .then((doc) => {
        if (doc.exists) {
          if (doc.data().order_description.extras.champAndRoles) {
            setAvailable(false);
          }
        };
      }).catch(err => console.log(err));
  }, [order_id, authUser]);

  return (
    <div>
      <Navbar />
      <Container component="main" maxWidth="lg" disableGutters={true}>
        <Grid container justify="space-evenly" style={{ marginTop: '3rem' }}>
          <Grid item xs={12} md={3}>
            <OrderDetails order_id={order_id} />
          </Grid>
          <Grid item xs={12} md={7}>
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
                  <Tab label="Account Info" value="SOLO_QUEUE" />
                  <Tab label="Champions and Roles" value="DUO_QUEUE" disabled={isAvailable} />
                  {
                    isAvailable &&
                    <Tooltip title="Not available in this order">
                      <InfoOutlinedIcon className={classes.ChampionAndRolesInfoIcon} />
                    </Tooltip>
                  }
                </Tabs>
              </AppBar>
              <TabPanel value="SOLO_QUEUE">
                <AccountInfoTab order_id={order_id} />
              </TabPanel>
              <TabPanel value="DUO_QUEUE" classes={{ root: classes.ChampionAndRolesTab }}>
                <ChampionsAndRolesTab order_id={order_id} />
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid>
        <Grid container justify="space-evenly">
          <Grid item xs={11} md={3}>
            <OrderTimeline order_id={order_id} />
          </Grid>
          <Grid item xs={11} md={7}>
            <Messenger
              authUser={authUser}
              order_id={order_id}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div >
  );
}

export default withRouter(Order);