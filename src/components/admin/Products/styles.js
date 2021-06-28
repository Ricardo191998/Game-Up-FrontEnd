import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme)=>({
    root: {
      maxWidth: 345,
      flexGrow: 1,
    },
    media: {
      height: 250,
    },
    button: {
        margin: theme.spacing(1),
      },
    text:{
       marginBottom:20,
    }
  }));