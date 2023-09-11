
//importing app.js
const app=require("./app");
const port=4000


// accessing config file using dotenv
const dotenv=require("dotenv");


const mongoose=require("mongoose");

const uri="mongodb+srv://paramtomar01:PARAMtomar123@cluster0.dis2nul.mongodb.net/"

mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    }) 
    .then(() => console.log('Database connected!'))
    .catch((err) => console.log(err))






// listening on the port
const server=app.listen(port,()=>{
    console.log(`server is working on ${port}`);
})
