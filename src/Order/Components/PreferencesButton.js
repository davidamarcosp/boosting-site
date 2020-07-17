import React, { useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { RolesContext, ChosenChampsContext } from '../Hooks/PreferencesContext';
import Firebase from '../../Firebase';

function PreferencesButton(props) {

  const { order_id } = props;
  const { roles } = React.useContext(RolesContext);
  const { chosenChampions, isSaved, setSaved } = useContext(ChosenChampsContext);

  const handleSaved = () => {
    Firebase.doSetPreferences(order_id, roles, chosenChampions);
    setSaved(true);
  };

  useEffect(() => {
    Firebase.getPreferences(order_id)
      .then(function (doc) {
        if (doc.exists) {
          if (doc.data().preferences !== undefined) {
            setSaved(doc.data().preferences.saved);
          };
        };
      }).catch(err => console.log(err));
  }, [order_id, setSaved])

  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      onClick={handleSaved}
      disabled={isSaved || chosenChampions.length < 8}
      style={{ marginTop: '24px' }}
    >
      {isSaved ? 'Saved' : 'Submit'}
    </Button>
  );
}

export default PreferencesButton;