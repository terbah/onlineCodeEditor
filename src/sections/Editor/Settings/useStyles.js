import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    //flexGrow: 1,
    flexDirection: 'column',
    height:'100%',
    marginRight : 10

/*     paddingLeft: 20,
    marginRight :10, */
/*     '& button': {
      marginRight: 10,
    }, */
  },
  control : {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    width : '100%',
    height : '10%'
  }, 

  console : {
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'space-between',
    width : '100%',
    height : '90%',
    marginLeft: 20,
    marginTop: 15
  },
  
  languages: {
    width: '100%',
    marginLeft: 20,
    // marginTop: 20,
  }, 
  title: {
    marginBottom: 10,
    marginTop: 10,
    height : '20%',
    width: '100%',
  }, 
/*   editor: {
    height: '80%',
    width: '100%',
    marginBottom: 12,
    marginTop: 12, 
  }, */
}));

export default useStyles;
