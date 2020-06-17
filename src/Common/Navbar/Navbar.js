import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from '../../Landing/Logo.jpg';
import useStyles from './NavbarStyles';
import { withRouter } from 'react-router';

function Navbar(props) {

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
    <Avatar alt="Logo" src={Logo} className={classes.Logo} onClick={() => props.history.push('/')}/>
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
                        <Typography component={'span'} align="center" onClick={() => props.history.push('/services/order-now')}>
                          Solo Q Boosting
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Typography component={'span'} align="center" onClick={() => props.history.push('/services/order-now')}>
                          Duo Q Boosting
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={handleClose} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography component={'span'} onClick={() => props.history.push('/services/order-now')}>
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
                <Button onClick={() => props.history.push('/services/order-now')}>
                  Solo Q
                </Button>
                <Button onClick={() => props.history.push('/services/order-now')}>
                  Duo Q
                </Button>
                <Button onClick={() => props.history.push('/services/order-now')}>
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

  return (
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
  );
};

export default withRouter(Navbar);