import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Messages from './Messages';
import NewMessageInput from './NewMessageInput';

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  }
}));

function Messenger(props) {

  const classes = useStyles();
  const { messages, order_id, authUser } = props;

  return (
    <React.Fragment>
      <Typography className={classes.text} variant="h5" gutterBottom>
        Chat
      </Typography>
      <Paper square>
        <Messages messages={messages} authUser={authUser} />
      </Paper>
      <NewMessageInput order_id={order_id} />
    </React.Fragment>
  );
}

export default Messenger;