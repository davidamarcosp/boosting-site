import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: '3rem',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
  }
}));

export default useStyles;