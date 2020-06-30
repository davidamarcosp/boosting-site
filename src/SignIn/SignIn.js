import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withFormik } from "formik";
import * as Yup from 'yup';
import Firebase from "../Firebase";
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import ForgotPasswordForm from './ForgotPasswordForm';
import useStyles from './SignInStyles';

const SignIn = props => {

  const classes = useStyles();
  const [isPasswordResetModalOpen, setisPasswordResetModalOpen] = React.useState(false);

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
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
          <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            helperText={touched.password ? errors.password : ""}
            error={touched.password && Boolean(errors.password)}
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            InputLabelProps={{ shrink: true }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {!isSubmitting ? 'Sign In' : <CircularProgress size={24} color="primary" />}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" onClick={() => setisPasswordResetModalOpen(true)}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="#" onClick={() => props.authRef.current = false}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <ForgotPasswordForm
        isPasswordResetModalOpen={isPasswordResetModalOpen}
        setisPasswordResetModalOpen={setisPasswordResetModalOpen}
      />
    </Container>
  );
}

const SignInForm = withFormik({
  mapPropsToValues: ({
    email,
    password
  }) => {
    return {
      email: email || "",
      password: password || ""
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Enter your password"),
  }),

  handleSubmit: (values, { setFieldError, setSubmitting, props }) => {
    setTimeout(() => {
      Firebase
        .doSignInWithEmailAndPassword(values.email, values.password)
        .then(() => {
          setSubmitting(false);
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            setFieldError('email', "Email not found");
          } else if (error.code === 'auth/wrong-password') {
            setFieldError('password', "User or password is wrong");
          } else if (error.code === 'auth/user-disabled') {
            setFieldError('email', "Email disabled");
          } else if (error.code === 'auth/too-many-requests') {
            setFieldError('email', "Too many requets, try again later")
          } else {
            console.error(error);
          }
          setSubmitting(false);
        })
    }, 1000);
  }
})(SignIn);

export default withRouter(SignInForm);