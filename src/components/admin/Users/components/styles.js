import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme)=>({
    root: {
      maxWidth: 345,
      flexGrow: 1,
      height: 350
    },
    button: {
        margin: theme.spacing(1),
      },
    input_space: {
        marginTop: 50,
        marginBottom:50
    },bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    }
  }));