import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { AuthContext } from '../../Common/Context/AuthContext';
import Firebase from '../../Firebase';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  message: {
    borderRadius: 8,
    padding: '0 20px',
  },
  box: {
    height: '100%',
    paddingLeft: 10,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 20
    }
  },
  chatInput: {
    paddingTop: '0px'
  },
  chatButton: {
    minWidth: '50px',
    [theme.breakpoints.up('sm')]: {
      minWidth: '64px'
    }
  }
}));

const NewMessageInput = (props) => {

  const classes = useStyles();
  const { order_id } = props;
  const { authUser } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    if (!authUser) return;
    const newMessage = {
      sender: { id: authUser.uid, displayName: authUser.displayName },
      content: message,
      date: Date.now()
    };
    Firebase.doSendChatMessage(order_id, newMessage);
    setMessage("");
  };

  return (
    <Paper elevation={5}>
      <form onSubmit={handleSubmitMessage}>
        <Grid container spacing={0} direction="row" className={classes.message}>
          <Grid item xs={10}>
            <TextField
              name="message"
              margin="normal"
              fullWidth
              id="message"
              placeholder="Message..."
              autoFocus
              value={message}
              disabled={!order_id}
              onChange={e => setMessage(e.target.value)}
              inputProps={{
                className: classes.chatInput
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Box display="flex" alignItems="center" className={classes.box}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={!message.length || !order_id}
                classes={{
                  root: classes.chatButton
                }}
              >
                SEND
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default NewMessageInput;