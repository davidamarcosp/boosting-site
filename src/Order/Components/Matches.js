import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import moment from 'moment';
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import champions from '../../Common/champion.json';

function Matches(props) {

  const { matchesIds, accountRegion, encryptedAccountId } = props;
  const [games, setGames] = React.useState();

  React.useEffect(() => {
    matchesIds !== undefined &&
      accountRegion !== undefined &&
      encryptedAccountId !== undefined &&
      axios({
        url: 'http://localhost:3001/MatchInfo',
        method: 'get',
        params: {
          matchesIds: matchesIds,
          accountRegion: accountRegion.toLowerCase(),
          encryptedAccountId: encryptedAccountId
        }
      }).then((response) => {
        console.log(response.data);
        setGames([...response.data]);
      }).catch((error) => {
        console.log(error);
      });
  }, [matchesIds, accountRegion, encryptedAccountId]);

  return (
    <Paper elevation={5}>
      <List>
        {games ? games.map((game, i) => {

          let dateString = moment.unix(game.date / 1000).format("DD/MM/YYYY hh:mm A");
          let championsRes = Object.values(champions.data);
          let champName = championsRes.map(champ => champ.key === game.champion.toString() ? champ.name : null);

          return (<ListItem key={game.id} style={{ backgroundColor: game.win ? 'inherit' : 'darkgray' }}>
            <Grid container>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="body2">{game.win ? "WIN" : "DEFEAT"}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">{dateString}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12}><Typography align="right" component="div" variant="body2">{champName}</Typography></Grid>
                  <Grid item xs={12}><Typography align="right" component="div" variant="body2">{game.kda}</Typography></Grid>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>)
        }) : (<Skeleton animation="pulse" variant="rect" width={380} height={285} />)}
      </List>
    </Paper>
  );
}

export default Matches;