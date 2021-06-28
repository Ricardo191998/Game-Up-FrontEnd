import React, {useState} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';


import { useSelector } from 'react-redux';

import useStyles from './styles';
import DialogUser from './components/DialogUpdateUser';

export const Dashboard = () => {
    //const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const {  name , email , lastname, type } = useSelector( state => state.auth );
    const classes = useStyles();
    
    return (
        <div>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
<                           Avatar className={classes.orange}>{name[0].toUpperCase()}</Avatar>
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                             {name + " " + lastname}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                            {email}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                            ROL: {type}
                            </Typography>
                        </Grid>
                        <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick = {()=>{
                                setOpen(true);
                            }}
                            className={classes.button}
                            endIcon={<EditIcon/>}
                        >
                            Editar
                        </Button>
                        </Grid>
                        </Grid>
                    </Grid>
                    </Grid>
                </Paper>
                </CardContent>
            </Card>
            <DialogUser open= {open} setOpen={setOpen}></DialogUser>
        </div>
    )
}
