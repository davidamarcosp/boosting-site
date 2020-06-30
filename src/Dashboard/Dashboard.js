import React from 'react';
import Firebase from '../Firebase';
import { AuthContext } from '../Common/Context/AuthContext';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import Navbar from '../Common/Navbar/Navbar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  table: {
    minWidth: 650,
  },
  //
  text: {
    padding: theme.spacing(2, 2, 0),
  }
  //
}));

function Dashboard(props) {

  const classes = useStyles();

  const [activeOrders, setActiveOrders] = React.useState([]);
  const [completedOrders, setCompletedOrders] = React.useState([]);
  const { authUser } = React.useContext(AuthContext);
  // const [messages, setMessages] = React.useState([]);


  React.useEffect(() => {
    authUser &&
      Firebase.getOrder()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            var source = querySnapshot.metadata.fromCache ? "local cache" : "server";
            if (doc.data().completed === false) {
              console.log(doc.data());
              console.log("Data came from " + source);
              setActiveOrders(st => { return [...st, { id: doc.id, data: doc.data() }] });
            } else if (doc.data().completed === true) {
              console.log(doc.data());
              console.log("Data came from " + source);
              setCompletedOrders(st => { return [...st, { id: doc.id, data: doc.data() }] });
            }
          });
        }).catch((error) => console.log("Error getting documents: ", error));
  }, [authUser]);

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        <h1> Active Orders </h1>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ width: '33%' }}>Date</TableCell>
                <TableCell align="center" style={{ width: '33%' }}>Order Type</TableCell>
                <TableCell align="center" style={{ width: '33%' }}>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activeOrders !== undefined && activeOrders.map((order, i) => (
                <TableRow hover key={i} onClick={() => props.history.push(`/order/${order.id}`)}>
                  <TableCell align="center">{order.data.created_at.seconds}</TableCell>
                  <TableCell align="center">{order.data.order_description.orderType}</TableCell>
                  <TableCell align="center">{order.data.order_description.queueType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {}
        <h1> Completed Orders </h1>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ width: '33%' }}>Date</TableCell>
                <TableCell align="center" style={{ width: '33%' }}>Order Type</TableCell>
                <TableCell align="center" style={{ width: '33%' }}>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {completedOrders !== undefined && completedOrders.map((order, i) => (
                <TableRow key={i}>
                  <TableCell align="center">{order.data.created_at.seconds}</TableCell>
                  <TableCell align="center">{order.data.order_description.orderType}</TableCell>
                  <TableCell align="center">{order.data.order_description.queueType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default withRouter(Dashboard);