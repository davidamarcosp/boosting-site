import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Avatar from '@material-ui/core/Avatar';
import topLane from '../../Common/RolesIcons/Position_Silver-Top.png'
import jungle from '../../Common/RolesIcons/Position_Silver-Jungle.png'
import middleLane from '../../Common/RolesIcons/Position_Silver-Mid.png'
import support from '../../Common/RolesIcons/Position_Silver-Support.png'
import bottomLane from '../../Common/RolesIcons/Position_Silver-Bot.png'
import { makeStyles } from '@material-ui/core/styles';

function RolesCheckBoxes(props) {

  const useStyles = makeStyles((theme) => ({
    rootForm: {
      display: 'flex',
    },
    formControl: {
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(2),
      },
    },
    extraOptionText: {
      fontSize: '0.9rem',
      padding: '2.5px 0'
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

  const classes = useStyles();
  const { state, dispatch } = props;
  const { roles, isSaved } = state;

  return (
    <div className={classes.rootForm}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup classes={{ root: classes.extraFormGroup }}>
          <FormControlLabel
            control={<Checkbox
              color="primary"
              checked={roles.top}
              onChange={(e) =>
                dispatch({
                  type: 'CHECK',
                  fieldName: 'top',
                  payload: e.currentTarget.checked,
                })
              }
              name="top"
              classes={{ root: classes.extraCheckbox }}
            />}
            label={<Avatar src={topLane} />}
            classes={{ label: classes.extraOptionText }}
            disabled={isSaved}
          />
          <FormControlLabel
            control={<Checkbox
              color="primary"
              checked={roles.jungle}
              onChange={(e) =>
                dispatch({
                  type: 'CHECK',
                  fieldName: 'jungle',
                  payload: e.currentTarget.checked,
                })
              }
              name="jungle"
              classes={{ root: classes.extraCheckbox }}
            />}
            label={<Avatar src={jungle} />}
            classes={{ label: classes.extraOptionText }}
            disabled={isSaved}
          />
          <FormControlLabel
            control={<Checkbox
              color="primary"
              checked={roles.mid}
              onChange={(e) =>
                dispatch({
                  type: 'CHECK',
                  fieldName: 'mid',
                  payload: e.currentTarget.checked,
                })
              }
              name="mid"
              classes={{ root: classes.extraCheckbox }}
            />}
            label={<Avatar src={middleLane} />}
            classes={{ label: classes.extraOptionText }}
            disabled={isSaved}
          />
          <FormControlLabel
            control={<Checkbox
              color="primary"
              checked={roles.support}
              onChange={(e) =>
                dispatch({
                  type: 'CHECK',
                  fieldName: 'support',
                  payload: e.currentTarget.checked,
                })
              }
              name="support"
              classes={{ root: classes.extraCheckbox }}
            />}
            label={<Avatar src={support} />}
            classes={{ label: classes.extraOptionText }}
            disabled={isSaved}
          />
          <FormControlLabel
            control={<Checkbox
              color="primary"
              checked={roles.adc}
              onChange={(e) =>
                dispatch({
                  type: 'CHECK',
                  fieldName: 'adc',
                  payload: e.currentTarget.checked,
                })
              }
              name="adc"
              classes={{ root: classes.extraCheckbox }}
            />}
            label={<Avatar src={bottomLane} />}
            classes={{ label: classes.extraOptionText }}
            disabled={isSaved}
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}

export default RolesCheckBoxes;