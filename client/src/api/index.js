import axios from 'axios';


const url= 'https://memories-mern-1000.herokuapp.com/posts';
export const fetchPosts= ()=>axios.get(url);
export const createPost =(newPost)=>axios.post(url, newPost);
export const deletePost = (id)=>axios.delete(`${url}/${id}`);
export const updatePost = (id, updatedPost)=>axios.patch(`${url}/${id}`, updatedPost);