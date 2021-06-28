import React , {useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import { Document, Page , pdfjs} from 'react-pdf';

import { useDispatch, useSelector } from 'react-redux'; 

import{setNullImage} from '../../../../../actions/shop';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogDownload(props) {
  const classes = useStyles();

  const {open} =  props;

  const { image } = useSelector( state => state.card );
  const { email } = useSelector( state => state.client);

  const [numPages, setNumPages] = useState(null);
 
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const dispatch = useDispatch();

  const handleDownload = () => {
     //triggerBase64Download(image, !!email ? `${email}ticket.png`: 'ticket.png')
     dispatch(setNullImage());
  };


  return (
    <div>
      <Dialog fullScreen open={open} onClose={()=>{handleDownload()}} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={()=>{handleDownload()}} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              FAVOR DE IMPRIMIR HOJA (GUARDAR TICKET_ID)
            </Typography>
          </Toolbar>
        </AppBar>
        {!!email?<div className="alert alert-primary" role="alert">
  Ticket enviado a <p  className="alert-link">{email}</p>.
                </div>:<div className="alert alert-danger" role="alert">
                        Sin correo.
                </div>}
        <Document
            file={`data:application/pdf;base64,${image}`}
            onLoadSuccess={onDocumentLoadSuccess}
            options={{workerSrc: "pdf.worker.js"}} 
        >
            <Page pageNumber={1} />
        </Document>
        <p>Page {1} of {numPages}</p>
      </Dialog>
    </div>
  );
}
