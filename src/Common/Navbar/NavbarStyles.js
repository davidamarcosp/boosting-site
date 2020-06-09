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
}));

export default useStyles;