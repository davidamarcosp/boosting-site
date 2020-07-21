import React, { memo } from 'react';
import Paper from '@material-ui/core/Paper';
import Messages from './Messages';
import NewMessageInput from './NewMessageInput';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  chatWindow: {
    height: '400px',
    overflowY: 'auto',
    marginBottom: '10px'
  }
}));

function Messenger(props) {

  const classes = useStyles();
  const { order_id, authUser } = props;

  return (
    <>
      <Paper className={classes.chatWindow} elevation={5}>
        <Messages authUser={authUser} order_id={order_id} />
      </Paper>
      <NewMessageInput order_id={order_id} />
    </>
  );
}

export default memo(Messenger);