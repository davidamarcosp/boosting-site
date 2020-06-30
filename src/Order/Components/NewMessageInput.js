import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Firebase from '../../Firebase';
import { AuthContext } from '../../Common/Context/AuthContext';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  message: {
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: '0 20px',
  },
  box: {
    height: '100%',
    paddingLeft: 20,
  }
}));

const NewMessageInput = (props) => {

  const classes = useStyles();
  const { order_id } = props;
  const [message, setMessage] = useState('');
  const { authUser } = React.useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!authUser) return;
    const newMessage = {
      sender: { id: authUser.uid, displayName: authUser.displayName },
      content: message,
      date: new Date()
    };
    Firebase.doSendChatMessage(order_id, newMessage);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={0} direction="row" className={classes.message}>
        <Grid item xs={10}>
          <TextField
            name="message"
            margin="normal"
            fullWidth
            id="message"
            label="Mensaje"
            autoFocus
            value={message}
            disabled={!order_id}
            onChange={e => setMessage(e.target.value)}
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
            >
              Enviar
              </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewMessageInput;