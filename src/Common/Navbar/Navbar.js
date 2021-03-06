import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PersonIcon from "@material-ui/icons/Person";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../../Landing/Logo.jpg";
import useStyles from "./NavbarStyles";
import SignUp from "../../SignUp/SignUp";
import SignIn from "../../SignIn/SignIn";
import { AuthContext } from "../Context/AuthContext";
import { withRouter } from "react-router";
import Dialog from "@material-ui/core/Dialog";

function Navbar(props) {
  const classes = useStyles();
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const { authUser } = React.useContext(AuthContext);
  const anchorRef = React.useRef(null);
  const authRef = React.useRef(true);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const logoNavbar = (
    <Avatar
      alt="Logo"
      src={Logo}
      className={classes.Logo}
      onClick={() => props.history.push("/")}
    />
  );

  const desktopNavbar = (
    <div className={classes.sectionDesktop}>
      <Breadcrumbs
        aria-label="breadcrumb"
        style={{ marginLeft: "auto", marginRight: "auto" }}
        separator="›"
      >
        <Button>FAQ</Button>
        <Button>RECENT WORK</Button>
        <Button>CONTACT US</Button>
        <div>
          <Button
            ref={anchorRef}
            // aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={() => props.history.push("/services/order-now")}
          >
            ORDER NOW
          </Button>
        </div>
      </Breadcrumbs>
      {authUser ? (
        <Button
          variant="outlined"
          size="small"
          startIcon={<AccountCircleIcon />}
          onClick={() => props.history.push("/dashboard")}
        >
          Dashboard
        </Button>
      ) : (
        <Button
          variant="outlined"
          size="small"
          startIcon={<PersonIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Members Area
        </Button>
      )}
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
      <Toolbar style={{ paddingRight: "0px", paddingLeft: "0px" }}>
        <List
          component="nav"
          aria-label="main mailbox folders"
          style={{ paddingBottom: "0px", width: "100%" }}
        >
          <ListItem button>
            <ListItemText
              primary="FAQ"
              primaryTypographyProps={{ style: { textAlign: "center" } }}
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="RECENT WORK"
              primaryTypographyProps={{ style: { textAlign: "center" } }}
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="CONTACT US"
              primaryTypographyProps={{ style: { textAlign: "center" } }}
            />
          </ListItem>
          <Divider />
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                ORDER NOW
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Breadcrumbs
                aria-label="breadcrumb"
                style={{ marginLeft: "auto", marginRight: "auto" }}
                separator="›"
              >
                <Button
                  onClick={() => props.history.push("/services/order-now")}
                >
                  Solo Q
                </Button>
                <Button
                  onClick={() => props.history.push("/services/order-now")}
                >
                  Duo Q
                </Button>
                <Button
                  onClick={() => props.history.push("/services/order-now")}
                >
                  Coaching
                </Button>
              </Breadcrumbs>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </List>
      </Toolbar>
    </div>
  );

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
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
      >
        {authRef.current ? (
          <div style={{ padding: "60px 10px" }}>
            <SignIn authRef={authRef} redirect={true} />
          </div>
        ) : (
          <div style={{ padding: "60px 10px" }}>
            <SignUp authRef={authRef} />
          </div>
        )}
      </Dialog>
    </AppBar>
  );
}

export default withRouter(Navbar);
