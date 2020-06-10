import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chat from './Chat.png';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
//
import Match from './Match.png';
import Banner from './Banner.jpg';
import Roles from './Roles.jpg';
import useStyles from './Styles';
//
import Footer from '../Common/Footer/Footer';
import Navbar from '../Common/Navbar/Navbar';
import { withRouter } from 'react-router';


function Landing(props) {

  const classes = useStyles();

  return (
    <div>
      <Navbar />
      <img alt="Banner" src={Banner} style={{ width: '100%' }} />
      <Typography variant="h4" component="h2" gutterBottom style={{ marginTop: '60px', marginBottom: '60px', borderBottom: '1px solid black', width: '65%', marginLeft: 'auto', marginRight: 'auto' }}>
        Boosting Features
      </Typography>
      <Container component="main" maxWidth="lg">
        <Grid container style={{ marginBottom: '5rem' }}>
          <Grid item xs={12} md={6} className={classes.chatImage}>
            <Card>
              <CardMedia src={Chat} className={classes.media} component="img">
              </CardMedia>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} className={classes.chatText}>
            <Typography variant="h5" component="h3" gutterBottom className={classes.TextTitle}>Live chat with your monkey</Typography>
            <Typography variant="body1" className={classes.TextText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec arcu purus, pulvinar a ullamcorper ut, laoreet et neque. Phasellus ultrices dapibus dictum. Cras ut velit in magna lobortis fermentum nec ut velit. Aliquam eget mauris quis tellus pretium venenatis ullamcorper sit amet sem. Suspendisse at metus mattis, condimentum velit ut, varius dui. In a magna nunc. In feugiat mollis justo accumsan tristique. Ut et mattis velit, eu pretium metus. Nulla facilisi.</Typography>
          </Grid>
        </Grid>
        {}
        <Grid container style={{ marginBottom: '5rem' }}>
          <Grid item xs={12} md={6} className={classes.matchText}>
            <Typography variant="h5" component="h3" gutterBottom className={classes.TextTitle}>Updated match history</Typography>
            <Typography variant="body1" className={classes.TextText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec arcu purus, pulvinar a ullamcorper ut, laoreet et neque. Phasellus ultrices dapibus dictum. Cras ut velit in magna lobortis fermentum nec ut velit. Aliquam eget mauris quis tellus pretium venenatis ullamcorper sit amet sem. Suspendisse at metus mattis, condimentum velit ut, varius dui. In a magna nunc.</Typography>
          </Grid>
          <Grid item xs={12} md={6} className={classes.matchImage}>
            <Card>
              <CardMedia src={Match} className={classes.media} component="img">
              </CardMedia>
            </Card>
          </Grid>
        </Grid>
        {}
        <Grid container style={{ marginBottom: '5rem' }}>
          <Grid item xs={12} md={6} className={classes.rolesImage}>
            <Card>
              <CardMedia src={Roles} className={classes.media} component="img">
              </CardMedia>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} className={classes.rolesText}>
            <Typography variant="h5" component="h3" gutterBottom className={classes.TextTitle}>Choose your champions and roles</Typography>
            <Typography variant="body1" className={classes.TextText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec arcu purus, pulvinar a ullamcorper ut, laoreet et neque. Phasellus ultrices dapibus dictum. Cras ut velit in magna lobortis fermentum nec ut velit. Aliquam eget mauris quis tellus pretium venenatis ullamcorper sit amet sem.</Typography>
          </Grid>
        </Grid>
        {}
        <Grid item xs={9} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <Card className={classes.finalCard}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" component="h3" gutterBottom style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>Are you ready to start?</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  className={classes.finalButton}
                  onClick={() => props.history.push('/services/order-now')}
                >
                  Check our prices
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Container>
      {}
      <Footer />
    </div>
  );
};

export default withRouter(Landing);