import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PurchaseContext } from '../../Common/Context/PurchaseContext';
import Firebase from '../../Firebase';

function CurrentTierBadge() {

  const { queueType, currentTier, currentDivision } = React.useContext(PurchaseContext);
  const [tierImageUrl, setTierImageUrl] = React.useState(null);

  React.useEffect(() => {
    setTierImageUrl(null);
    Firebase.getBadgeImage(queueType, currentTier, currentDivision)
      .then(url => setTierImageUrl(url))
      .catch(err => console.log(err));
  }, [currentTier, currentDivision, queueType]);

  return (
    tierImageUrl
      ? <img alt="ranked badge" src={tierImageUrl} style={{ width: '170px', height: 'auto' }} />
      : <CircularProgress size={100} style={{ margin: '37.5px' }} />
  )
};

export default CurrentTierBadge;