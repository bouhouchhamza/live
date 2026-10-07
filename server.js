import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const app = express();


mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connection is okey')
}).catch((error)=>{
    console.log('connection is failed due to:', error)
})
app.use(express.json());
const PORT = process.env.PORT || 3000;
// app.get('/mes',(req,res)=>{
//     res.status(200).json({
//         message: 'server is ON'
//     }
//     )
// })
app.listen()
app.listen(PORT, ()=>{
    console.log('server is running');
})

