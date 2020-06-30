import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  list: {
    marginBottom: theme.spacing(2),
  }
}));

function Messages(props) {

  const classes = useStyles();
  const { messages, authUser } = props;
  console.log("RENDER");

  return (
    <List className={classes.list}>
      {messages.map((message, i) => {
        let senderStyle;
        if (message.sender.id === authUser.uid) senderStyle = { textAlign: "end" };
        else senderStyle = {};
        return <ListItem key={i} button>
          <ListItemText key={i} primary={message.sender.displayName} secondary={message.content} style={senderStyle} />
        </ListItem>
      })}
    </List>
  );
}

export default Messages;