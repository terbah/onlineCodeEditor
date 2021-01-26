import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 20,
  },

  sett: {
    height: '100%',
    width : '35%',
    marginBottom: 10,
    marginTop: 10,
  },
  mnEditor: {
    width: '65%',
    height: '100%',
    marginBottom: 10,
    marginTop: 10,
  },
}));

export default useStyles;
