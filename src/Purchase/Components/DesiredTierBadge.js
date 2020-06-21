import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TierAndDivisionContext } from '../../Common/Context/TierAndDivisionContext';
import { QueueTypeContext } from '../../Common/Context/QueueTypeContext';
import Firebase from '../../Firebase';

function DesiredTierBadge() {

  const { desiredTier, desiredDivision } = React.useContext(TierAndDivisionContext);
  const { queueType } = React.useContext(QueueTypeContext);
  const [tierImageUrl, setTierImageUrl] = React.useState(null);

  React.useEffect(() => {
    setTierImageUrl(null);
    Firebase.getBadgeImage(queueType, desiredTier, desiredDivision)
      .then(url => setTierImageUrl(url))
      .catch(err => console.log(err));
  }, [desiredTier, desiredDivision, queueType]);

  return (
    tierImageUrl
      ? <img alt="ranked badge" src={tierImageUrl} style={{ width: '170px', height: 'auto' }} />
      : <CircularProgress size={100} style={{ margin: '37.5px' }} />
  )
};

export default DesiredTierBadge;