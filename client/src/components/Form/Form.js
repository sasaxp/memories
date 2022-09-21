import React, {useState, useEffect} from "react";
import useStyles from './styles'
import { useSelector } from "react-redux";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
//import FileBase from 'react-file-base64';
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";
import { updatePost } from "../../actions/posts";
import imageCompression from 'browser-image-compression';
const Form= ({currentId, setCurrentId})=>{
    
    
    const classes= useStyles();
    const [cflag, setClag]= useState(false);
    const [postData, setPostData]= useState({
        creator:'', title:'', message:'', tags:'', selectedFile:''
    })

    const post= useSelector(state => currentId ? state.posts.find(p=>p._id=== currentId): null);
    const dispatch= useDispatch();
    useEffect(()=>{
        if(post) setPostData(post)

    }, [post])

    const handleSubmit= (e)=>{
        
     
        e.preventDefault();
        
        if(currentId){
             dispatch(updatePost(currentId, postData));
             console.log('postdata', postData);
        }
           
        else {
            if(postData.selectedFile===null || postData.selectedFile===''){
                console.log('empty imput file');
                
                
            }
                
            else
                dispatch (createPost(postData)) ;
           
        }
        clear()
        
        
        
    }
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
        const options = {
            maxSizeMB: 0.2,
            maxWidthOrHeight: 512,
            useWebWorker: true
          }
        setClag(true)
        const compressedFile = await imageCompression(file, options); 
        setClag(false);
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);
        const base64 = await convertBase64(compressedFile);
        setPostData({...postData, selectedFile:base64})
        e.target.value=null;
        
      };
    
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });

    };
    const clear= ()=>{
        setCurrentId(null);
        setPostData({creator:'', title:'', message:'', tags:'', selectedFile:''});
        
    }
    return(
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}  onSubmit={handleSubmit}>
           
            <Typography variant="h6">{currentId ? 'Editing': 'Creating'} a Memory</Typography>

            <TextField 
                margin="dense"
                
                name='creator' 
                variant='outlined' 
                label='Creator' 
                fullWidth
                value={postData.creator} 
                onChange={(e)=>setPostData({...postData, creator:e.target.value})}

             />
             <TextField 
                margin="dense"
                name='title' 
                variant='outlined' 
                label='Title' 
                fullWidth
                value={postData.title} 
                onChange={(e)=>setPostData({...postData, title:e.target.value})}

             />
            <TextField 
                margin="dense"
                name='message' 
                variant='outlined' 
                label='Message' 
                fullWidth
                value={postData.message} 
                onChange={(e)=>setPostData({...postData, message:e.target.value})}

             />
             
             {/* <TextField
                margin="dense"
                name='tags' 
                variant='outlined' 
                label='Tags' 
                fullWidth
                value={postData.tags} 
                onChange={(e)=>setPostData({...postData, tags:e.target.value})}

             /> */}
             {/* <div className={classes.fileInput}>
                <FileBase 
                        type='file' 
                        multiple={false} 
                        onDone={
                            ({base64})=>{setPostData({...postData, selectedFile:base64})}
                           
                            }

                />
             </div> */}
             <Typography variant="h6">{cflag ? 'Compressing...': ''}</Typography>
             
             <div>
                <img src={postData.selectedFile} height={50}/>
             </div>
             <Button  variant="contained" component="label"  fullWidth size='small'>
                Select File
                <input type="file" onChange={(e) => {uploadImage(e);}}  id={`preview`} style={{ display: 'none' }}/>
             </Button>
             
             


             <Button   variant="contained"  size='small' type="submit" fullWidth>Submit</Button>
             <Button variant="contained" color='secondary' size='small'  fullWidth onClick={clear}>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;
