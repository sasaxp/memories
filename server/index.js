import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';
import dotenv from 'dotenv';
const app= express();
dotenv.config();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors());
app.use('/posts', postRoutes);
app.get('/', (req,res)=>{
    res.send('Hello to Memories API');
})
//const CONNECTION_URL= 'mongodb+srv://thyme:thyme3000@cluster0.8natqvq.mongodb.net/?retryWrites=true&w=majority';
const PORT= process.env.PORT||5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
                .then(()=>app.listen(PORT, ()=>console.log(`listening on port: ${PORT}`)))
                .catch((error)=>console.log(error.message));