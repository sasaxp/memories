import React from "react";
import useStyles from './styles'
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import { deletePost } from "../../../actions/posts";
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment';

const Post= ({post, setCurrentId})=>{
    const dispatch= useDispatch();
    const classes= useStyles();
    return(
        <Card className={classes.card}>
            <CardMedia className={classes.media}  image={post.selectedFile} title={post.title}/>   
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.creator}</Typography> 
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color:'white'}} size='small' onClick={()=>setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize='medium' />
                </Button>
            </div>
            <Typography className={classes.title} variant='h5'gutterBottom>{post.title}</Typography>   
            <CardContent>
            
                <Typography className={classes.title} variant='body2' gutterBottom>{post.message}</Typography>    
            </CardContent>
            <CardActions style={{justifyContent: 'right'}}>
                <Button  size="small" color="primary" onClick={()=>{dispatch(deletePost(post._id))}}>
                    <DeleteIcon fontSize='small' />
                    DELETE
                </Button>    
            </CardActions>
        </Card>
    )
}

export default Post;