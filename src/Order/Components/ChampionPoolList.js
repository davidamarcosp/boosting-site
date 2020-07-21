import React, { useState, useRef } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import champs from '../../Common/champion.json';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
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
  button: {
    margin: theme.spacing(0.5, 0),
  },
  deleteButton: {
    padding: '2px'
  },
  TextFieldinput: {
    padding: '15px 16px'
  },
  TextField: {
    position: 'sticky',
    top: '0px',
    left: '0px',
    zIndex: '10',
    backgroundColor: 'white',
  },
}));

function ChampionPoolList(props) {

  const { state, dispatch } = props;

  const classes = useStyles();
  const initialChampPool = useRef();
  const [champions, setChampions] = useState();
  const [query, setQuery] = useState("");
  const [wait, setWait] = useState(true);

  const handleSearch = (event) => {
    let newValue = event.target.value;
    setQuery(newValue);
    setChampions(st => {
      return initialChampPool.current.filter(champ => {
        return champ.toUpperCase().includes(newValue.toUpperCase());
      });
    });
  };

  const ChampionList = () => {
    if (!wait) {
      return champions.map((value) => {
        const labelId = `transfer-list-item-${value}-label`;
        return (
          <ListItem
            key={value}
            role="listitem"
            button
            onClick={() => {
              dispatch({ type: 'CHOOSE_CHAMPION', payload: value })
            }}
            disabled={state.isSaved}
          >
            <ListItemText id={labelId} primary={value} />
          </ListItem>
        );
      });
    };
  };

  const MemoizedChampionList = React.useMemo(() => {
    return ChampionList();
    // eslint-disable-next-line
  }, [query, wait]);

  React.useEffect(() => {
    const parsedChamps = Object.values(champs.data);
    const champsArray = parsedChamps.map(champ => champ.name);
    initialChampPool.current = champsArray;
    setChampions(champsArray);
    // Waiting for the other states to settle before rendering the list
    let timer = setTimeout(() => {
      setWait(false);
    }, [500]);
    return () => {
      clearTimeout(timer);
    };
  }, [setChampions]);

  return (
    <Paper className={classes.paper}>
      <TextField
        id="standard-secondary"
        placeholder="Champion name..."
        color="primary"
        value={query}
        onChange={handleSearch}
        disabled={state.isSaved}
        inputProps={{
          className: classes.TextFieldinput
        }}
        classes={{
          root: classes.TextField
        }}
      />
      <List dense component="div" role="list">
        {!state.isSaved && MemoizedChampionList}
      </List>
    </Paper>
  );
};

export default ChampionPoolList;