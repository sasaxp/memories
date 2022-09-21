import React, {useEffect, useState} from 'react';
// import Container from '@mui/material/Container';
// import AppBar from '@mui/material/AppBar';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import Grow from '@mui/material/Grow';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import memories from './images/memories.png'
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import { useDispatch } from 'react-redux';
import {getPosts} from './actions/posts';
import useStyles from './styles';

const App= ()=>{
    const [currentId, setCurrentId]= useState(null);
    const classes= useStyles();
    const dispatch= useDispatch(); 
    useEffect(()=>{
        dispatch(getPosts());
        
    },[ dispatch])
    return(
        <Container maxWidth='lg'>
            <AppBar className={classes.appBar}  position='static' >

                <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
                <img className={classes.image} src={memories} alt= 'memories' height='60' ></img>
            </AppBar><br/>
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>    
                </Container>    
            </Grow>

        </Container>
    )

}
export default App;