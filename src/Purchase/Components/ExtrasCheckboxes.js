import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ExtrasContext } from '../../Common/Context/ExtrasContext';

function ExtrasCheckBoxes() {

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    formControl: {
      width: '100%',
      margin: '1rem 1rem',
      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(2),
      },
    },
    extraOptionText: {
      fontSize: '0.9rem',
    },
    extraCheckbox: {
      padding: '6px',
    },
    extraFormLabel: {
      marginLeft: 'auto',
      marginRight: 'auto',
      [theme.breakpoints.up('sm')]: {
        marginBottom: '1rem',
      },
    },
    extraFormGroup: {
      marginTop: '1rem',
      marginLeft: '0.9rem',
      [theme.breakpoints.up('sm')]: {
        marginTop: '0rem',
        marginLeft: '1rem',
      },
    }
  }));

  const { extras, handleExtrasChange } = React.useContext(ExtrasContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" classes={{ root: classes.extraFormLabel }}>Extra services</FormLabel>
        <FormGroup classes={{ root: classes.extraFormGroup }}>
          <FormControlLabel
            control={<Checkbox color="primary" checked={extras.champAndRoles} onChange={handleExtrasChange} name="champAndRoles" classes={{ root: classes.extraCheckbox }} />}
            label="Champions / Roles"
            classes={{ label: classes.extraOptionText }}
          />
          <FormControlLabel
            control={<Checkbox color="primary" checked={extras.priority} onChange={handleExtrasChange} name="priority" classes={{ root: classes.extraCheckbox }} />}
            label="Priority"
            classes={{ label: classes.extraOptionText }}
          />
          <FormControlLabel
            control={<Checkbox color="primary" checked={extras.plusWin} onChange={handleExtrasChange} name="plusWin" classes={{ root: classes.extraCheckbox }} />}
            label="+1 Win"
            classes={{ label: classes.extraOptionText }}
          />
          <FormControlLabel
            control={<Checkbox color="primary" checked={extras.streaming} onChange={handleExtrasChange} name="streaming" classes={{ root: classes.extraCheckbox }} />}
            label="Streaming"
            classes={{ label: classes.extraOptionText }}
          />
          <FormControlLabel
            control={<Checkbox color="primary" checked={extras.coaching} onChange={handleExtrasChange} name="coaching" classes={{ root: classes.extraCheckbox }} />}
            label="Coaching"
            classes={{ label: classes.extraOptionText }}
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}

export default ExtrasCheckBoxes;