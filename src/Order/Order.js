import React from 'react';
import Firebase from '../Firebase';
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Messenger from './Components/Messenger';
import { AuthContext } from '../Common/Context/AuthContext';
import Navbar from '../Common/Navbar/Navbar';

function Order(props) {

  const order_id = props.match.params.id;
  const { authUser } = React.useContext(AuthContext);
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    Firebase.getMessages(order_id, onSnapshot => {
      onSnapshot.docChanges().forEach(change => {
        console.log(change.doc.data());
        var source = onSnapshot.metadata.fromCache ? "local cache" : "server";
        console.log("Data came from " + source);
        setMessages(st => [...st, change.doc.data()]);
      });
    })
  }, [order_id]);

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        <Messenger
          messages={messages}
          authUser={authUser}
          order_id={order_id}
        />
      </Container>
    </div>
  );
}

export default withRouter(Order);