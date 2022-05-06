const mongoose=require('mongoose');
 mongoose
    .connect(process.env.DB_CONNECTION,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
          })
    .then(()=>console.log(`connected to MongoDB`))
    .catch((err)=>console.log('Failed to connect to MonDB',err));