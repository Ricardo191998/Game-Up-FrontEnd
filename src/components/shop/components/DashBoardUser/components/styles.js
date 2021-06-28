import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme)=>({
    root: {
        '& > *': {
          borderBottom: 'unset',
        },
    },
    container: {
      maxHeight: 440,
      marginTop: 10
    },
    icon:{
      margin: 5
    },
    button: {
      margin: theme.spacing(1),
    },
    input_space: {
      marginTop: 50,
      marginBottom:50
    }
  }));