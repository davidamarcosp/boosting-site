import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import PaypalCheckoutButton from '../../Common/Paypal/PaypalCheckoutButton';
import firebase from 'firebase';
import { RegionContext } from '../../Common/Context/RegionContext';
import { TierAndDivisionContext } from '../../Common/Context/TierAndDivisionContext';
import { AuthContext } from '../../Common/Context/AuthContext';
import { CurrentLPContext } from '../../Common/Context/CurrentLPContext';
import { QueueTypeContext } from '../../Common/Context/QueueTypeContext';
import { NumberOfGamesContext } from '../../Common/Context/NumberOfGamesContext';
import { ExtrasContext } from '../../Common/Context/ExtrasContext';
import ExtrasCheckBoxes from '../Components/ExtrasCheckboxes';

import SignUp from '../../SignUp/SignUp';
import SignIn from '../../SignIn/SignIn';

function PurchaseOrder(props) {

  const useStyles = makeStyles((theme) => ({
    checkoutButton: {
      padding: '0.8rem 2.5rem',
      fontSize: '0.8rem',
      marginBottom: '1rem',
      [theme.breakpoints.up('sm')]: {
        padding: '1rem 3.5rem',
        fontSize: '1rem',
        marginBottom: '0rem',
      },
    }
  }));

  // STATE & PROPS

  const classes = useStyles();
  const { orderType } = props;
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const authRef = React.useRef();
  const orderRef = React.useRef();

  // CONTEXT

  const { authUser, authUserPaymentSuccesful, setAuthUserPaymentSuccesful } = React.useContext(AuthContext);
  const { extras } = React.useContext(ExtrasContext);
  const { numberOfGames } = React.useContext(NumberOfGamesContext);
  const { currentLP } = React.useContext(CurrentLPContext);
  const { queueType } = React.useContext(QueueTypeContext);
  const { region } = React.useContext(RegionContext);
  const {
    currentTier,
    currentDivision,
    desiredTier,
    desiredDivision,
  } = React.useContext(TierAndDivisionContext);

  React.useEffect(() => {
    console.log('Firestore call!');
    setLoading(true);
    axios({
      url: 'https://us-central1-boosting-site.cloudfunctions.net/OrderCalculation',
      method: 'GET',
      params: {
        currentTier: currentTier,
        currentDivision: currentDivision,
        currentLP: currentLP,
        desiredTier: desiredTier,
        desiredDivision: desiredDivision,
        orderType: orderType,
        queueType: queueType,
        numberOfGames: numberOfGames
      }
    })
      .then(res => {
        if (parseInt(res.data.result) > 0) {
          orderRef.current = res.data.result;
          setLoading(false);
        };
      })
      .catch(err => {
        console.log(err);
      });
  },
    [
      currentTier,
      currentDivision,
      currentLP,
      desiredTier,
      desiredDivision,
      orderType,
      queueType,
      numberOfGames
    ]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setAuthUserPaymentSuccesful(false);
    }, 100);
  };

  const authUI = (authUser) => {
    if (authUser) {
      return (
        <React.Fragment>
          <Typography variant="h6" component="div">Please select your preferred payment method below:</Typography>
          <Typography
            variant="subtitle2"
            component="div"
            style={{ display: 'flex', justifyContent: 'center', marginTop: '5px', alignItems: 'center' }}
          >
            Logged as {authUser && authUser.email}
          </Typography>
          <Button variant="text" size="small" onClick={() => firebase.auth().signOut()}>NOT YOU?</Button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Typography variant="h6" component="div">Please authenticate before proceeding</Typography>
        </React.Fragment>
      );
    };
  };

  const authUIActions = (authUser) => {
    if (authUser) return <PaypalCheckoutButton order={order} paypal={true} />
    else return authRef.current ? <SignIn authRef={authRef} /> : <SignUp authRef={authRef} />  // <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  };

  const getOrderDescription = () => {
    if (orderType === "PLACEMENT") {
      return {
        region: region,
        orderType: orderType,
        currentTier: currentTier,
        numberOfGames: numberOfGames,
        extras: extras
      };
    } else if (queueType === "Division") {
      return {
        region: region,
        orderType: orderType,
        queueType: queueType,
        currentTier: currentTier,
        currentDivision: currentDivision,
        currentLP: currentLP,
        desiredTier: desiredTier,
        desiredDivision: desiredDivision,
        extras: extras
      };
    } else if (queueType === "Wins") {
      return {
        region: region,
        orderType: orderType,
        queueType: queueType,
        currentTier: currentTier,
        currentDivision: currentDivision,
        numberOfGames: numberOfGames,
        extras: extras
      };
    } else if (queueType === "Ranked Games") {
      return {
        region: region,
        orderType: orderType,
        queueType: queueType,
        currentTier: currentTier,
        numberOfGames: numberOfGames,
        extras: extras
      };
    } else if (queueType === "Normal Games") {
      return {
        region: region,
        orderType: orderType,
        queueType: queueType,
        numberOfGames: numberOfGames,
        extras: extras
      };
    };
  };

  const succesfulPaymentUI = (
    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <CheckCircleOutlineIcon style={{ height: '3.8rem', width: '3.8rem', color: 'green', marginBottom: '1rem' }} />
      <Typography variant="body1" component="div" style={{ marginBottom: '1.5rem' }}>
        Your payment has been successfully processed
      </Typography>
      <Typography variant="body1" align="center" component="div">
        You will receive an email within a few minutes with instructions on how to proceed with your order
      </Typography>
    </Grid>
  );

  const order = {
    customer: authUser && authUser.displayName,
    total: orderRef.current,
    items: [
      {
        name: 'Digital Goods',
        price: orderRef.current,
        quantity: 1,
        currency: 'USD'
      }
    ],
    description: getOrderDescription()
  };

  return (
    <Grid container justify="center">
      <Grid item xs={9}>
        <Card style={{ width: '100%' }} raised={true}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} sm={6}>
              <ExtrasCheckBoxes />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container>
                <Grid item xs={12}>
                  {isLoading ? <CircularProgress size={30} /> : <Typography style={{ fontSize: '1.5rem' }}>{`$ ${orderRef.current}`}</Typography>}
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined" color="primary" disabled={isLoading} onClick={handleClickOpen} classes={{ root: classes.checkoutButton, label: classes }}>
                    CHECKOUT
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title" style={{ display: 'flex', justifyContent: 'center' }}>
          {authUserPaymentSuccesful
            ? "CONGRATULATIONS!"
            : "Checkout Process"
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ display: 'flex', justifyContent: 'center', marginTop: '5px', alignItems: 'center', flexDirection: 'column' }}>
            {authUserPaymentSuccesful
              ? succesfulPaymentUI
              : authUI(authUser)
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center', marginBottom: '15px' }} >
          {authUserPaymentSuccesful
            ? null
            : authUIActions(authUser)
          }
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default PurchaseOrder;