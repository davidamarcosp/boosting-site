import React from 'react';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
//
import Logo from './Logo.jpg';
import Match from './Match.png';
import Banner from './Banner.jpg';
import Roles from './Roles.jpg';
import useStyles from './Styles';
//
import Chat from './Chat.png';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
//

function Navbar() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const prevOpen = React.useRef(open);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    };
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    };
  };

  const logoNavbar = (
    <Link href='/#'>
      <Avatar alt="Logo" src={Logo} className={classes.Logo} />
    </Link>
  );

  const desktopNavbar = (
    <div className={classes.sectionDesktop}>
      <Breadcrumbs aria-label="breadcrumb" style={{ marginLeft: 'auto', marginRight: 'auto' }} separator="›">
        <Button>
          FAQ
        </Button>
        <Button>
          RECENT WORK
        </Button>
        <Button>
          CONTACT US
        </Button>
        <div>
          <Button
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            ORDER NOW
            </Button>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <MenuItem onClick={handleClose}>
                        <Typography align="center">
                          Solo Q Boosting
                          </Typography>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Typography align="center">
                          Duo Q Boosting
                          </Typography>
                      </MenuItem>
                      <MenuItem onClick={handleClose} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography>
                          LoL Coaching
                          </Typography>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Breadcrumbs>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        startIcon={<PersonIcon />}
      >
        Members Area
      </Button>
    </div>
  );

  const mobileNavbar = (
    <div className={classes.sectionMobile}>
      <IconButton
        aria-label="show more"
        aria-haspopup="true"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
    </div>
  );

  const mobileMenu = (
    <div className={classes.mobileMenu}>
      <Toolbar style={{ paddingRight: '0px', paddingLeft: '0px' }}>
        <List component="nav" aria-label="main mailbox folders" style={{ paddingBottom: '0px', width: '100%' }}>
          <ListItem button>
            <ListItemText primary="FAQ" primaryTypographyProps={{ style: { textAlign: 'center' } }} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="RECENT WORK" primaryTypographyProps={{ style: { textAlign: 'center' } }} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="CONTACT US" primaryTypographyProps={{ style: { textAlign: 'center' } }} />
          </ListItem>
          <Divider />
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>ORDER NOW</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Breadcrumbs aria-label="breadcrumb" style={{ marginLeft: 'auto', marginRight: 'auto' }} separator="›">
                <Button>
                  Solo Q
                  </Button>
                <Button>
                  Duo Q
                  </Button>
                <Button>
                  Coaching
                  </Button>
              </Breadcrumbs>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </List>
      </Toolbar>
    </div>
  );

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Best Boosting Site
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <div>
      <AppBar position="sticky" color="inherit">
        <Container component="main" maxWidth="lg">
          <Toolbar>
            {logoNavbar}
            {desktopNavbar}
            {mobileNavbar}
          </Toolbar>
        </Container>
        {isMobileMenuOpen && mobileMenu}
      </AppBar>
      {/* {isMobileMenuOpen && mobileMenu} */}
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
                >
                  Check our prices
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Container>
      {}
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          {/* <Typography variant="body1">My sticky footer can be found here.</Typography> */}
          <Copyright />
        </Container>
      </footer>
    </div>
  );
};

export default Navbar;