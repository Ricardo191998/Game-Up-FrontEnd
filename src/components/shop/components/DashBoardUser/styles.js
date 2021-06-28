import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';


export default makeStyles((theme) => ({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        width: theme.spacing(10),
        height: theme.spacing(10),
      },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    menuButton: {
      marginTop: 15,
      fontSize: 100,
      marginInlineEnd:0,
      marginLeft: 201, 
    },
    appBar : {
      marginTop: 10,
      marginBottom : 20,
      height: 150
    }
  })
);
  