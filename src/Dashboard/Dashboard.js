import React from "react";
import Firebase from "../Firebase";
import { AuthContext } from "../Common/Context/AuthContext";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withRouter } from "react-router-dom";
import Navbar from "../Common/Navbar/Navbar";
import Button from "@material-ui/core/Button";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import RestoreOutlinedIcon from "@material-ui/icons/RestoreOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";
import ChevronRightOutlinedIcon from "@material-ui/icons/ChevronRightOutlined";
import Footer from "../Common/Footer/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  table: {
    minWidth: 650,
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  pixelCurrency: {
    order: 2,
    [theme.breakpoints.up("sm")]: {
      order: 1,
    },
  },
  welcomeMessage: {
    order: 1,
    marginBottom: "2.5rem",
    [theme.breakpoints.up("sm")]: {
      order: 2,
      marginBottom: 0,
    },
  },
}));

function Dashboard(props) {
  const classes = useStyles();

  const [activeOrders, setActiveOrders] = React.useState([]);
  const [completedOrders, setCompletedOrders] = React.useState([]);
  const { authUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    authUser &&
      Firebase.getOrder()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            var source = querySnapshot.metadata.fromCache
              ? "local cache"
              : "server";
            if (doc.data().completed === false) {
              console.log(doc.data());
              console.log("Data came from " + source);
              setActiveOrders((st) => {
                return [...st, { id: doc.id, data: doc.data() }];
              });
            } else if (doc.data().completed === true) {
              console.log(doc.data());
              console.log("Data came from " + source);
              setCompletedOrders((st) => {
                return [...st, { id: doc.id, data: doc.data() }];
              });
            }
          });
        })
        .catch((error) => console.log("Error getting documents: ", error));
  }, [authUser]);

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container justify="space-between" style={{ marginTop: "4rem" }}>
          <Grid item xs={12} md={4} className={classes.pixelCurrency}>
            <Paper style={{ padding: "1.5rem" }} elevation={4}>
              <div style={{ display: "flex" }}>
                <Typography variant="h6" align="left" style={{ width: "44%" }}>
                  Pixels Available:{" "}
                </Typography>
                <Tooltip title="Pixels explanation here">
                  <HelpOutlineIcon
                    style={{ position: "relative", top: "5px", left: "50%" }}
                  />
                </Tooltip>
              </div>
              <Typography
                variant="h6"
                align="left"
                style={{ paddingBottom: "1rem" }}
              >
                <AttachMoneyIcon
                  style={{
                    position: "relative",
                    top: "4px",
                    marginRight: "8px",
                  }}
                />
                0
              </Typography>
              <Divider />
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <AddIcon
                  style={{
                    position: "relative",
                    top: "-1px",
                    marginRight: "10px",
                  }}
                />
                <Typography
                  variant="body2"
                  style={{ marginTop: "15px", marginBottom: "1rem" }}
                >
                  Buy pixels
                </Typography>
              </div>
              <Divider />
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <RestoreOutlinedIcon
                  style={{
                    position: "relative",
                    top: "6px",
                    marginRight: "10px",
                  }}
                />
                <Typography variant="body2" style={{ marginTop: "15px" }}>
                  Transaction history
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={7} className={classes.welcomeMessage}>
            <Paper style={{ padding: "1.5rem" }} elevation={4}>
              <Typography
                variant="h4"
                align="left"
                style={{ padding: "1.25rem 0" }}
              >
                Welcome Back, {authUser && authUser.displayName}!
              </Typography>
              <Divider />
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <SettingsOutlinedIcon
                  style={{
                    position: "relative",
                    top: "-1px",
                    marginRight: "10px",
                  }}
                />
                <Typography
                  variant="body2"
                  style={{ marginTop: "15px", marginBottom: "1rem" }}
                >
                  Account settings
                </Typography>
              </div>
              <Divider />
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  Firebase.doSignOut();
                  props.history.push("/");
                }}
              >
                <PowerSettingsNewOutlinedIcon
                  style={{
                    position: "relative",
                    top: "7px",
                    marginRight: "10px",
                  }}
                />
                <Typography variant="body2" style={{ marginTop: "15px" }}>
                  Logout
                </Typography>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Typography variant="h5" align="left" style={{ margin: "1.5rem 0" }}>
          <ChevronRightOutlinedIcon
            style={{ fontSize: "2.5rem", position: "relative", top: "11px" }}
          />
          Active orders
        </Typography>
        <TableContainer
          component={Paper}
          style={{
            boxShadow:
              "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
          }}
        >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ width: "29%" }}>
                  Date
                </TableCell>
                <TableCell align="center" style={{ width: "29%" }}>
                  ID
                </TableCell>
                <TableCell align="center" style={{ width: "29%" }}>
                  Booster
                </TableCell>
                <TableCell align="center" style={{ width: "13%" }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {activeOrders !== undefined &&
                activeOrders.map((order, i) => {
                  let dateString = moment
                    .unix(order.data.created_at / 1000)
                    .format("DD/MM/YYYY");
                  let orderId = order.id.slice(order.id.length - 12);
                  return (
                    <TableRow key={i}>
                      <TableCell align="center">{dateString}</TableCell>
                      <TableCell align="center">
                        {orderId.toUpperCase()}
                      </TableCell>
                      <TableCell align="center">-</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          startIcon={<ChevronRightIcon />}
                          onClick={() =>
                            props.history.push(`/order/${order.id}`)
                          }
                        >
                          VIEW
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {activeOrders.length === 0 && (
                <div style={{ display: "flex" }}>
                  <Typography
                    style={{
                      padding: "2rem 0",
                      position: "relative",
                      top: "50%",
                      left: "170%",
                      transform: "translateX(-50%)",
                      color: "gray",
                    }}
                    // align="center"
                    variant="h5"
                  >
                    NO DATA
                    <ErrorOutlineOutlinedIcon
                      style={{ position: "relative", top: "3px", left: "6px" }}
                    />
                  </Typography>
                </div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {}
        <Typography variant="h5" align="left" style={{ margin: "1.5rem 0" }}>
          <ChevronRightOutlinedIcon
            style={{ fontSize: "2.5rem", position: "relative", top: "11px" }}
          />
          Completed orders
        </Typography>
        <TableContainer
          component={Paper}
          style={{
            boxShadow:
              "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
          }}
        >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ width: "29%" }}>
                  Date
                </TableCell>
                <TableCell align="center" style={{ width: "29%" }}>
                  ID
                </TableCell>
                <TableCell align="center" style={{ width: "29%" }}>
                  Booster
                </TableCell>
                <TableCell align="center" style={{ width: "13%" }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {completedOrders !== undefined &&
                completedOrders.map((order, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">
                      {order.data.created_at}
                    </TableCell>
                    <TableCell align="center">
                      {order.data.order_description.region}
                    </TableCell>
                    <TableCell align="center">
                      {order.data.order_description.orderType}
                    </TableCell>
                    <TableCell align="center">
                      {order.data.order_description.queueType}
                    </TableCell>
                  </TableRow>
                ))}
              {completedOrders.length === 0 && (
                <div style={{ display: "flex" }}>
                  <Typography
                    style={{
                      padding: "2rem 0",
                      position: "relative",
                      top: "50%",
                      left: "170%",
                      transform: "translateX(-50%)",
                      color: "gray",
                    }}
                    // align="center"
                    variant="h5"
                  >
                    NO DATA
                    <ErrorOutlineOutlinedIcon
                      style={{ position: "relative", top: "3px", left: "6px" }}
                    />
                  </Typography>
                </div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
    </div>
  );
}

export default withRouter(Dashboard);
