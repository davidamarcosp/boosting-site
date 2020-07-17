import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Firebase from '../../Firebase';
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

function AccountInfoTab(props) {

  const classes = useStyles();
  const { order_id } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [summoner, setSummoner] = useState("");
  const [isSaved, setSaved] = useState(false);

  // const handleSummonerChange = (event) => {
  //   setSummoner(event.target.value);
  // };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

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
    Firebase.doSetCredentials(username, password, order_id);
    setSaved(true);
    // }).catch((error) => {
    //   alert("Summoner does not exist");
    // });
  };

  useEffect(() => {
    Firebase.getCrendentials(order_id)
      .then((doc) => {
        if (doc.exists) {
          if (doc.data().credentials !== undefined) {
            // setSummoner(doc.data().credentials.summoner);
            setUsername(doc.data().credentials.username);
            setPassword(doc.data().credentials.password);
            setSaved(doc.data().credentials.saved);
          };
        };
      }).catch(err => console.log(err));
  }, [order_id]);

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h6" align="center"> Setup your credentials </Typography>
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit}>
          {/* <TextField
            onChange={handleSummonerChange}
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
          /> */}
          <TextField
            onChange={handleUsernameChange}
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
            onChange={handlePasswordChange}
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