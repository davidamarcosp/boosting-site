import React from 'react';
import Firebase from '../../Firebase';
import axios from 'axios';
import Matches from './Matches';

function MatchHistory(props) {

  const { order_id } = props;
  const accountRegion = React.useRef();
  const encryptedAccountId = React.useRef();
  const [matches, setMatches] = React.useState();

  React.useEffect(() => {
    Firebase.getCrendentials(order_id)
      .then(function (doc) {
        if (doc.exists) {

          accountRegion.current = doc.data().order_description.region;
          encryptedAccountId.current = doc.data().credentials.encryptedAccountId;

          axios({
            url: 'http://localhost:3001/MatchHistory',
            method: 'get',
            params: {
              encryptedAccountId: doc.data().credentials.encryptedAccountId,
              beginTime: doc.data().created_at,
              accountRegion: accountRegion.current.toLowerCase()
            }
          })
            .then((response) => {
              let matchesIds = [];
              // console.log(response.data.matches);
              response.data.matches.forEach((match) => {
                matchesIds.push(match.gameId);
              });
              setMatches([...matchesIds]);
            })
            .catch((error) => {
              console.log(error);
            });

        };
      }).catch(err => console.log(err));
  }, [order_id]);

  return (
    <>
      <Matches matchesIds={matches} accountRegion={accountRegion.current} encryptedAccountId={encryptedAccountId.current}/>
    </>
  );
}

export default MatchHistory;