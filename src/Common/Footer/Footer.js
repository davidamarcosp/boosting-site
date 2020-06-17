import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import useStyles from './FooterStyles';

function Footer() {

  const classes = useStyles();

  const Copyright = () => {
    return (
      <Typography component="span" variant="body2" color="textSecondary">
        {'Copyright © '}
        <Link color="inherit" href="#">
          Best Boosting Site
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Copyright />
      </Container>
    </footer>
  );
};

export default Footer;