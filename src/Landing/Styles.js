import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  Logo: {
    height: '50px',
    width: '50px',
    [theme.breakpoints.up('sm')]: {
      height: '65px',
      width: '65px',
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      width: '100%',
    },
  },
  sectionMobile: {
    display: 'flex',
    marginLeft: 'auto',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  mobileMenu: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
  media: {
    height: 'auto',
  },
  TextTitle: {
    marginBottom: '30px',
    [theme.breakpoints.up('md')]: {
      marginTop: '15px',
    },
  },
  TextText: {
    marginRight: '4rem',
    marginLeft: '4rem',
  },
  chatImage: {
    order: 2,
    margin: 'auto',
    [theme.breakpoints.up('md')]: {
      order: 1,
    },
  },
  chatText: {
    order: 1,
    marginBottom: '3rem',
    [theme.breakpoints.up('md')]: {
      order: 2,
      marginTop: 'auto',
      marginBottom: 'auto',
    },
  },
  matchImage: {
    margin: 'auto',
    [theme.breakpoints.up('md')]: {
      order: 2,
    },
  },
  matchText: {
    marginBottom: '3rem',
    [theme.breakpoints.up('md')]: {
      order: 1,
      marginTop: 'auto',
      marginBottom: 'auto',
    },
  },
  rolesImage: {
    order: 1,
    margin: 'auto',
    [theme.breakpoints.up('md')]: {
      order: 2,
    },
  },
  rolesText: {
    marginBottom: '3rem',
    [theme.breakpoints.up('md')]: {
      order: 2,
      marginTop: 'auto',
      marginBottom: 'auto',
    },
  },  
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: '3rem',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
  },
  finalCard: {
    backgroundColor:
    theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
  finalButton: { 
    marginBottom: '1.5rem',
    [theme.breakpoints.up('md')]: {
      marginTop: '1.5rem', 
    },
  }
}));

export default useStyles;