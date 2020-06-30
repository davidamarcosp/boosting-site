import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { withFormik } from "formik";
import * as Yup from 'yup';
import Firebase from "../Firebase";
import useStyles from './SignUpFormStyles';

const SignUp = props => {

  const classes = useStyles();
  const [isPasswordVisible, toggleVisibility] = React.useState(false);

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
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nickName}
                helperText={touched.nickName ? errors.nickName : ""}
                error={touched.nickName && Boolean(errors.nickName)}
                autoComplete="nickName"
                name="nickName"
                variant="outlined"
                fullWidth
                id="nickName"
                label="Nickname"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                helperText={touched.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                helperText={touched.password ? errors.password : ""}
                error={touched.password && Boolean(errors.password)}
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        className={classes.eye}
                        onClick={() => toggleVisibility(!isPasswordVisible)}
                      >
                        {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                variant="outlined"
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={isPasswordVisible ? 'text' : 'password'}
                id="confirmPassword"
                autoComplete="confirm-password"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        className={classes.eye}
                        onClick={() => toggleVisibility(!isPasswordVisible)}
                      >
                        {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={12} sm={9}>
              <Button
                disabled={isSubmitting}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {!isSubmitting ? 'Sign Up' : <CircularProgress size={24} color="primary" />}
              </Button>
            </Grid>
            <Grid item>
              <Link to="#" onClick={() => props.authRef.current = true}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const SignUpForm = withFormik({
  mapPropsToValues: ({
    nickName,
    email,
    password,
  }) => {
    return {
      nickName: nickName || "",
      email: email || "",
      password: password || "",
    };
  },

  validationSchema: Yup.object().shape({
    nickName: Yup.string().required("Required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must contain at least 8 characters")
      .matches(/[A-Z]/, "At least one uppercase character")
      .matches(/[0-9]/, "At least one number")
      .required("Enter your password"),
    confirmPassword: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Password does not match")
  }),

  handleSubmit: (values, { setFieldError, setSubmitting, setStatus }) => {
    setTimeout(() => {
      Firebase
        .doCreateUserWithEmailAndPassword(values.email, values.password)
        .then(authUser => {
          return Firebase.doRegisterUserInformation({ userID: authUser.user.uid, ...values });
        })
        .then(() => {
          setStatus({ success: true })
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setFieldError('email', "Email is already used");
          } else {
            console.error(error);
          }
        })
        .finally(() => {
          setSubmitting(false);
        });
    }, 1000);
  }
})(SignUp);

export default withRouter(SignUpForm);