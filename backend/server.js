const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const app = express();


//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/products', productRoutes);

//health check
app.get('/', (req,res)=>{
    res.json({message: 'Inventory API is running'});
});

//global error handler
app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).json({message:err.message || 'Internal Server Error'});
});

//connect to mongoDb and start the server
mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDb Connected...");
    app.listen(process.env.PORT,()=>{
        console.log(`Server running on port  ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.error('MongoDb connection failed : ', err.message);
    process.exit(1);
});