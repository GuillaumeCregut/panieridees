const express = require('express');
const cors = require('cors');
const router = require('./routes/index.routes');
const port=process.env.PORT || 8000;

//need to create mongo connection

const corsOptions ={
    // origin:process.env.CLIENT_URL,  
    origin: true,
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
  }

const app=express();
app.use(express.urlencoded({extended:true}));
app.use(cors(corsOptions));
app.use('/api',router);

//Prevent response on /
app.get('/',(req,res)=>{
    res.send('Welcome');
});

//Start server
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
});

module.exports = app;