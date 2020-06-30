import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withFormik } from "formik";
import * as Yup from 'yup';
import Firebase from "../Firebase";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './ForgotPasswordFormStyles';

const ForgotPassword = props => {

  const classes = useStyles();

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    isPasswordResetModalOpen,
    setisPasswordResetModalOpen
  } = props;

  return (
    <Dialog
      open={isPasswordResetModalOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
      onBackdropClick={() => setisPasswordResetModalOpen(false)}
      PaperProps={{
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'auto',
          padding: '1rem 0'
        }
      }}
    >
      {props.status ?
        <Grid container justify="center">
          <DialogTitle id="alert-dialog-title">{"Email sent"}</DialogTitle>
          <Grid item xs={10}>
            <CheckCircleIcon style={{ height: '3.5rem', width: '3.5rem', color: 'green', position: 'relative', left: '50%', transform: 'translateX(-50%)', marginBottom: '1rem' }} />
            <DialogActions style={{ justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setisPasswordResetModalOpen(false)}
              >
                OK
            </Button>
            </DialogActions>
          </Grid>
        </Grid>
        :
        <Grid container justify="center">
          <DialogTitle id="alert-dialog-title">{"Enter your email"}</DialogTitle>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container justify="center">
              <Grid item xs={10} sm={8}>
                <TextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  helperText={touched.email ? errors.email : ""}
                  error={touched.email && Boolean(errors.email)}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {!isSubmitting ? 'Send email' : <CircularProgress size={24} color="primary" />}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      }
    </Dialog>
  );
}

const ForgotPasswordForm = withFormik({
  mapPropsToValues: ({
    email
  }) => {
    return {
      email: email || "",
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required")
  }),

  handleSubmit: (values, { setFieldError, setSubmitting, setStatus }) => {
    setTimeout(() => {
      Firebase
        .doSendPasswordResetEmail(values.email)
        .then(() => {
          setSubmitting(false);
          setStatus({ success: true });
        })
        .catch(error => {
          setSubmitting(false);
          if (error.code === 'auth/user-not-found') {
            setFieldError('email', "Email not found");
          } else {
            console.error(error);
          }
        });
    }, 1000);
  }
})(ForgotPassword);

export default ForgotPasswordForm;