import React, { useEffect, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';
import Firebase from '../../Firebase';
import moment from 'moment';

const ROOT_CSS = css({
  height: 400,
  width: 'auto'
});

function Messages(props) {

  const { authUser, order_id } = props;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    Firebase.getMessages(order_id, onSnapshot => {
      onSnapshot.docChanges().forEach(change => {
        // console.log(change.doc.data());
        setMessages(st => [...st, change.doc.data()]);
      });
    });
  }, [order_id]);

  return (
    <ScrollToBottom className={ROOT_CSS}>
      {messages && messages.map((message, i) => {

        let senderStyle;
        if (message.sender.id === authUser.uid) senderStyle = { textAlign: "end", maxWidth: '80%' };
        else senderStyle = { maxWidth: '80%' };

        let dateSenderStyle;
        if (message.sender.id === authUser.uid) dateSenderStyle = { textAlign: "start", maxWidth: '20%', marginTop: 'auto' };
        else dateSenderStyle = { order: '1', maxWidth: '20%', textAlign: "end", marginTop: 'auto' };

        let dateString = moment.unix(message.date / 1000).format("HH:mm A");

        return (<ListItem key={i}>
          <ListItemText
            primary={dateString}
            style={dateSenderStyle}
            primaryTypographyProps={{ variant: "caption", style: { fontSize: '0.65rem' } }}
          />
          <ListItemText
            key={i}
            primary={message.sender.displayName}
            secondary={message.content}
            style={senderStyle}
            secondaryTypographyProps={{ style: { wordWrap: "break-word" } }}
          />
        </ListItem>)
      })}
    </ScrollToBottom>
  );
}

export default Messages;