import React, { useContext, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { ChosenChampsContext } from '../Hooks/PreferencesContext';
import Firebase from '../../Firebase';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 120,
    height: 250,
    overflow: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: 170,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  deleteButton: {
    padding: '2px'
  }
}));

function ChosenChampionList(props) {

  const classes = useStyles();
  const { order_id } = props;
  const { isSaved, setSaved, chosenChampions, setChosenChampions } = useContext(ChosenChampsContext);

  const handleChampionDelete = (value) => {
    setChosenChampions(st => {
      let newRight = st.filter(options => {
        return options !== value
      })
      return newRight;
    })
  };

  useEffect(() => {
    Firebase.getPreferences(order_id)
      .then((doc) => {
        if (doc.exists) {
          if (doc.data().preferences) {
            let champions = doc.data().preferences.champions;
            setChosenChampions(st => [...champions]);
            setSaved(doc.data().preferences.saved);
          };
        };
      }).catch(err => console.log(err));
  }, [order_id, setChosenChampions, setSaved, isSaved]);

  return (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {chosenChampions.map((value, i) => {
          const labelId = `transfer-list-item-${value}-label`;
          return (
            <ListItem
              key={i}
              role="listitem"
              disabled={isSaved}
            >
              <ListItemText id={labelId} primary={value} />
              {
                !isSaved &&
                <IconButton
                  aria-label="delete"
                  onClick={() => handleChampionDelete(value)}
                  classes={{ root: classes.deleteButton }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );
}

export default ChosenChampionList;