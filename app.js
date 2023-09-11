const express=require("express")
const app=express();
app.use(express.json({limit:'50mb'}));
const cookieparser=require("cookie-parser");
const bodyParser=require("body-parser");


const dotenv=require("dotenv");

app.use(express.json());
app.use(cookieparser());
app.use(bodyParser.urlencoded({extended:true}));

const user=require("./routes/userroutes")
const document=require("./routes/docroutes")
app.use("/api/v1",user);
app.use("/api/v1",document)


module.exports = app