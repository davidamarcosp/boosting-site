import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { TierAndDivisionContext } from '../../Common/Context/TierAndDivisionContext';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { AuthContext } from '../../Common/Context/AuthContext';
import PaypalCheckoutButton from '../../Common/Paypal/PaypalCheckoutButton';
import firebase from 'firebase';

//
import { CurrentLPContext } from '../../Common/Context/CurrentLPContext';
import { QueueTypeContext } from '../../Common/Context/QueueTypeContext';
import { NumberOfGamesContext } from '../../Common/Context/NumberOfGamesContext';

function PurchaseOrder(props) {

  const [orderValue, setOrderValue] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const { authUser, authUserPaymentSuccesful, setAuthUserPaymentSuccesful } = React.useContext(AuthContext);
  const {
    currentTier,
    currentDivision,
    desiredTier,
    desiredDivision,
  } = React.useContext(TierAndDivisionContext);

  const { numberOfGames } = React.useContext(NumberOfGamesContext);
  const { currentLP } = React.useContext(CurrentLPContext);
  const { queueType } = React.useContext(QueueTypeContext);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  const order = {
    customer: authUser && authUser.displayName,
    total: orderValue,
    items: [
      {
        name: 'Digital Goods',
        price: orderValue,
        quantity: 1,
        currency: 'USD'
      }
    ],
  };

  React.useEffect(() => {
    console.log('CALLED');
    setLoading(true);
    setTimeout(() => {
      axios({
        url: 'https://us-central1-boosting-site.cloudfunctions.net/OrderCalculation',
        method: 'GET',
        params: {
          currentTier: currentTier,
          currentDivision: currentDivision,
          currentLP: currentLP,
          desiredTier: desiredTier,
          desiredDivision: desiredDivision,
          orderType: props.orderType,
          queueType: queueType,
          numberOfGames: numberOfGames
        }
      })
        .then(res => {
          if (parseInt(res.data.result) > 0) {
            setOrderValue(res.data.result);
            setLoading(false);
          };
        })
        .catch(err => {
          console.log(err);
        });
    }, 350);
  },
    [
      currentTier,
      currentDivision,
      currentLP,
      desiredTier,
      desiredDivision,
      props.orderType,
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
            Logged as {authUser && authUser.displayName}
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
    if (authUser) {
      return (
        <PaypalCheckoutButton order={order} />
      );
    } else {
      return (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      );
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

  return (
    <Grid container>
      <Grid item xs={12}>
        {isLoading ? <CircularProgress size={20} /> : <Typography>{`${orderValue} $`}</Typography>}
      </Grid>
      <Grid item xs={12}>
        <Button variant="outlined" color="primary" disabled={isLoading} onClick={handleClickOpen}>
          CHECKOUT
        </Button>
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