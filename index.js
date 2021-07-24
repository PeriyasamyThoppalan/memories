import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
dotenv.config();
const app = express();

app.use(bodyParser.json({limi:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use('/posts',postRoutes);
app.get('/',(req,res)=>{
    res.send('Hello, Welcome to memories APIs');
});

const CONNECTION_URI=process.env.CONNECTION_URI;
const PORT=process.env.PORT||5000;

mongoose.connect(CONNECTION_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=> console.log(`Application is running on PORT: ${PORT}`)))
.catch((error)=>console.log(error.message));

mongoose.set('useFindAndModify',false);

