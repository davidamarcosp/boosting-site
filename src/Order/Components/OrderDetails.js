import React, { useEffect, useState, memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import Firebase from "../../Firebase";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Tooltip from "@material-ui/core/Tooltip";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "2rem",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("md")]: {
      width: "100%",
      maxWidth: 360,
      marginBottom: 0,
    },
  },
  overline: {
    lineHeight: "1.75rem",
  },
  text: {
    marginLeft: "1rem",
    fontWeight: "600",
  },
  SecondaryText: {
    marginLeft: "0.5rem",
    fontSize: "0.85rem",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
  snackbar: {
    backgroundColor: "#3f68d9",
  },
  InfoIcon: {
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    left: "20%",
    color: "gray",
  },
}));

function OrderDetails(props) {
  const classes = useStyles();

  const { order_id } = props;
  const [orderDetails, setOrderDetails] = useState();
  const [isPaused, setPaused] = useState();
  const [open, setOpen] = useState(false);

  const ParseTier = (orderDetails) => {
    let tier = orderDetails.currentTier;
    switch (tier) {
      case 0:
        return "Iron";
      case 1:
        return "Bronze";
      case 2:
        return "Silver";
      case 3:
        return "Gold";
      case 4:
        return "Platinum";
      case 5:
        return "Diamond";
      default:
        break;
    }
  };

  const ParseTierAndDivision = (orderDetails, option) => {
    let tier;
    let division;
    if (option === "desired") {
      tier = orderDetails.desiredTier;
      division = orderDetails.desiredDivision;
    } else if (option === "current") {
      tier = orderDetails.currentTier;
      division = orderDetails.currentDivision;
    }
    switch (tier) {
      case 0:
        switch (division) {
          case 0:
            return "Iron IV";
          case 1:
            return "Iron III";
          case 2:
            return "Iron II";
          case 3:
            return "Iron I";
          default:
            break;
        }
        break;
      case 1:
        switch (division) {
          case 0:
            return "Bronze IV";
          case 1:
            return "Bronze III";
          case 2:
            return "Bronze II";
          case 3:
            return "Bronze I";
          default:
            break;
        }
        break;
      case 2:
        switch (division) {
          case 0:
            return "Silver IV";
          case 1:
            return "Silver III";
          case 2:
            return "Silver II";
          case 3:
            return "Silver I";
          default:
            break;
        }
        break;
      case 3:
        switch (division) {
          case 0:
            return "Gold IV";
          case 1:
            return "Gold III";
          case 2:
            return "Gold II";
          case 3:
            return "Gold I";
          default:
            break;
        }
        break;
      case 4:
        switch (division) {
          case 0:
            return "Platinum IV";
          case 1:
            return "Platinum III";
          case 2:
            return "Platinum II";
          case 3:
            return "Platinum I";
          default:
            break;
        }
        break;
      case 5:
        switch (division) {
          case 0:
            return "Diamond IV";
          case 1:
            return "Diamond III";
          case 2:
            return "Diamond II";
          case 3:
            return "Diamond I";
          default:
            break;
        }
        break;
      default:
        break;
    }
  };

  const ParseOrderType = (orderDetails) => {
    let orderType = orderDetails.orderType;
    switch (orderType) {
      case "SOLO_QUEUE":
        return "Solo Queue";
      case "DUO_QUEUE":
        return "Duo Queue";
      case "PLACEMENT":
        return "Placement Games";
      default:
        break;
    }
  };

  const ParseQueueType = (orderDetails) => {
    let queueType = orderDetails.queueType;
    switch (queueType) {
      case "Division":
        return "Division Boosting";
      case "Wins":
        return "Net Wins";
      case "Ranked Games":
        return "Ranked Games";
      case "Normal Games":
        return "Normal Games";
      default:
        break;
    }
  };

  const ParseRegion = (orderDetails) => {
    let region = orderDetails.region;
    switch (region) {
      case "NA1":
        return "NA";
      case "EUW1":
        return "EUW";
      case "EUN1":
        return "EUNE";
      case "LA1":
        return "LAN";
      case "LA2":
        return "LAS";
      case "BR1":
        return "BR";
      case "TR1":
        return "TR";
      case "RU":
        return "RU";
      case "OC1":
        return "OC";
      default:
        break;
    }
  };

  const handlePauseChange = (event) => {
    setTimeout(() => {
      setPaused((isPaused) => {
        Firebase.handlePauseShit(order_id, !isPaused);
        !isPaused
          ? Firebase.setEvent(order_id, {
              date: Date.now(),
              text: "Your order has been paused",
            })
          : Firebase.setEvent(order_id, {
              date: Date.now(),
              text: "Your order has been unpaused",
            });
      });
      setOpen(true);
    }, 250);
  };

  useEffect(() => {
    Firebase.getShit(order_id, function (doc) {
      console.log(doc.data());
      if (doc.exists) {
        if (doc.data().pause) {
          setPaused(true);
        } else {
          setPaused(false);
        }
        setOrderDetails(doc.data());
      }
    });
  }, [order_id]);

  const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 60,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(34px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "#3f68d9",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#3f68d9",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[400],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        checked={isPaused || ""}
        onChange={handlePauseChange}
        {...props}
      />
    );
  });

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  function Alert(props) {
    return (
      <MuiAlert
        elevation={6}
        variant="filled"
        {...props}
        classes={{ filledInfo: classes.snackbar }}
      />
    );
  }

  const getOrderUI = (order) => {
    let orderDetails = order.order_description;
    let orderType = order.order_description.orderType;
    let queueType = order.order_description.queueType;
    if (orderType === "PLACEMENT") {
      return (
        <>
          <ListItem>
            <Typography
              variant="body2"
              classes={{
                root: classes.text,
              }}
            >
              Mode:
            </Typography>
            <Typography
              variant="caption"
              classes={{
                root: classes.SecondaryText,
              }}
            >
              {ParseOrderType(orderDetails)}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant="body2"
              classes={{
                root: classes.text,
              }}
            >
              Region:
            </Typography>
            <Typography
              variant="caption"
              classes={{
                root: classes.SecondaryText,
              }}
            >
              {ParseRegion(orderDetails)}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant="body2"
              classes={{
                root: classes.text,
              }}
            >
              Past Tier:
            </Typography>
            <Typography
              variant="caption"
              classes={{
                root: classes.SecondaryText,
              }}
            >
              {ParseTier(orderDetails)}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant="body2"
              classes={{
                root: classes.text,
              }}
            >
              # of Games:
            </Typography>
            <Typography
              variant="caption"
              classes={{
                root: classes.SecondaryText,
              }}
            >
              {orderDetails.numberOfGames}
            </Typography>
          </ListItem>
        </>
      );
    } else {
      return (
        <>
          <ListItem>
            <Typography
              variant="body2"
              classes={{
                root: classes.text,
              }}
            >
              Mode:
            </Typography>
            <Typography
              variant="caption"
              classes={{
                root: classes.SecondaryText,
              }}
            >
              {ParseOrderType(orderDetails)}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant="body2"
              classes={{
                root: classes.text,
              }}
            >
              Type:
            </Typography>
            <Typography
              variant="caption"
              classes={{
                root: classes.SecondaryText,
              }}
            >
              {ParseQueueType(orderDetails)}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant="body2"
              classes={{
                root: classes.text,
              }}
            >
              Region:
            </Typography>
            <Typography
              variant="caption"
              classes={{
                root: classes.SecondaryText,
              }}
            >
              {ParseRegion(orderDetails)}
            </Typography>
          </ListItem>
          {queueType === "Wins" ? (
            <>
              <ListItem>
                <Typography
                  variant="body2"
                  classes={{
                    root: classes.text,
                  }}
                >
                  Rank:
                </Typography>
                <Typography
                  variant="caption"
                  classes={{
                    root: classes.SecondaryText,
                  }}
                >
                  {ParseTierAndDivision(orderDetails, "current")}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant="body2"
                  classes={{
                    root: classes.text,
                  }}
                >
                  # of Games:
                </Typography>
                <Typography
                  variant="caption"
                  classes={{
                    root: classes.SecondaryText,
                  }}
                >
                  {orderDetails.numberOfGames}
                </Typography>
              </ListItem>
            </>
          ) : null}
          {queueType === "Ranked Games" ? (
            <>
              <ListItem>
                <Typography
                  variant="body2"
                  classes={{
                    root: classes.text,
                  }}
                >
                  Current Tier:
                </Typography>
                <Typography
                  variant="caption"
                  classes={{
                    root: classes.SecondaryText,
                  }}
                >
                  {ParseTier(orderDetails)}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant="body2"
                  classes={{
                    root: classes.text,
                  }}
                >
                  # of Games:
                </Typography>
                <Typography
                  variant="caption"
                  classes={{
                    root: classes.SecondaryText,
                  }}
                >
                  {orderDetails.numberOfGames}
                </Typography>
              </ListItem>
            </>
          ) : null}
          {queueType === "Normal Games" ? (
            <>
              <ListItem>
                <Typography
                  variant="body2"
                  classes={{
                    root: classes.text,
                  }}
                >
                  # of Games:
                </Typography>
                <Typography
                  variant="caption"
                  classes={{
                    root: classes.SecondaryText,
                  }}
                >
                  {orderDetails.numberOfGames}
                </Typography>
              </ListItem>
            </>
          ) : null}
          {queueType === "Division" ? (
            <>
              <ListItem>
                <Typography
                  variant="body2"
                  classes={{
                    root: classes.text,
                  }}
                >
                  Start:
                </Typography>
                <Typography
                  variant="caption"
                  classes={{
                    root: classes.SecondaryText,
                  }}
                >
                  {ParseTierAndDivision(orderDetails, "current")}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant="body2"
                  classes={{
                    root: classes.text,
                  }}
                >
                  Finish:
                </Typography>
                <Typography
                  variant="caption"
                  classes={{
                    root: classes.SecondaryText,
                  }}
                >
                  {ParseTierAndDivision(orderDetails, "desired")}
                </Typography>
              </ListItem>
            </>
          ) : null}
        </>
      );
    }
  };

  return (
    <Card className={classes.root} elevation={5}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem>
          <ListItemText
            primary="Order details"
            primaryTypographyProps={{
              variant: "h6",
              align: "center",
            }}
          />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        {orderDetails && getOrderUI(orderDetails)}
      </List>
      <Divider />
      <List>
        <Tooltip
          title="Pause explanation here"
          className={classes.InfoIcon}
        >
          <InfoOutlinedIcon />
        </Tooltip>
        <FormControlLabel
          control={<IOSSwitch />}
          label="Pause Order"
          labelPlacement="start"
        />
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info">
            {isPaused
              ? "Your order has been paused"
              : "Your order has been unpaused"}
          </Alert>
        </Snackbar>
      </List>
    </Card>
  );
}

export default memo(OrderDetails);
