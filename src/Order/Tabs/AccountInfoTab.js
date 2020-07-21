import React, { useReducer, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Firebase from '../../Firebase';
import AccountInfoReducer from '../Hooks/AccountInfoReducer';
// import axios from 'axios';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.info.dark,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialState = {
  username: '',
  password: '',
  summoner: '',
  error: '',
  isSaved: false
};

function AccountInfoTab(props) {

  const { order_id } = props;
  const [state, dispatch] = useReducer(AccountInfoReducer, initialState);
  const { username, password, summoner, error, isSaved } = state;
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    // axios({
    //   url: 'http://localhost:3001/summonerId',
    //   method: 'get',
    //   params: {
    //     summonerName: summoner
    //   }
    // }).then((response) => {
    //   const { accountId } = response.data; // add accountId to firebase method
    Firebase.doSetCredentials(username, password, summoner, order_id);
    dispatch({ type: 'SUBMIT' });
    // }).catch((error) => {
    //   alert("Summoner does not exist");
    // });
  };

  useEffect(() => {
    Firebase.getCrendentials(order_id)
      .then((doc) => {
        if (doc.exists && doc.data().credentials) {
          const { username, password, summoner, saved } = doc.data().credentials;
          dispatch({
            type: 'SET_DATA',
            payload: {
              username: username,
              password: password,
              summoner: summoner,
              isSaved: saved
            }
          });
        } else {
          dispatch({ type: 'SET_ERROR', payload: 'Document does not exist' });
        };
      }).catch(err => console.log(err));
  }, [order_id]);

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h6" align="center"> Setup your credentials </Typography>
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            onChange={(e) =>
              dispatch({
                type: 'FIELD',
                fieldName: 'summoner',
                payload: e.currentTarget.value,
              })
            }
            value={summoner}
            variant="outlined"
            margin="normal"
            fullWidth
            id="summoner"
            label="Summoner Name"
            name="summoner"
            autoComplete="summoner"
            disabled={isSaved}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            onChange={(e) =>
              dispatch({
                type: 'FIELD',
                fieldName: 'username',
                payload: e.currentTarget.value,
              })
            }
            value={username}
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            disabled={isSaved}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            onChange={(e) =>
              dispatch({
                type: 'FIELD',
                fieldName: 'password',
                payload: e.currentTarget.value,
              })
            }
            value={password}
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            disabled={isSaved}
            InputLabelProps={{ shrink: true }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSaved || username.lenght < 2 || password.length < 4}
          >
            {isSaved ? 'Saved' : 'Submit'}
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default AccountInfoTab;