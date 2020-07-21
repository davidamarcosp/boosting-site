import React from "react";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 120,
    height: 250,
    overflow: "auto",
    [theme.breakpoints.up("sm")]: {
      width: 170,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  deleteButton: {
    padding: "2px",
  },
}));

function ChosenChampionList(props) {
  const classes = useStyles();
  const { state, dispatch } = props;
  const { isSaved, chosenChampions } = state;

  return (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {chosenChampions.map((value, i) => {
          const labelId = `transfer-list-item-${value}-label`;
          return (
            <ListItem key={i} role="listitem" disabled={state.isSaved}>
              <ListItemText id={labelId} primary={value} />
              {!isSaved && (
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    dispatch({ type: "DELETE_CHAMPION", payload: value });
                  }}
                  classes={{ root: classes.deleteButton }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );
}

export default ChosenChampionList;