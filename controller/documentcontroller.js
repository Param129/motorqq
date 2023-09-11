const Document=require("../models/documentmodel")
const User=require("../models/usermodel")
const bcrypt = require('bcryptjs');

const ErrorHandler = require("../utils/errorhandler");

exports.createdocument=async(req,res,next)=>{
    const {name,document,}=req.body;


    const doc=await Document.create(req.body);
    res.status(201).json({
        success:true,
        doc,
    });
}


exports.getdoc=async(req,res,next)=>{
    const {mobileNo, password}=req.body;
    let user=await User.findOne({mobileNo:mobileNo});
    if(!user) {
        return res.status(404).json({error:true, msg:'User Not Found'});
    }
    if(user.password !== password){
        return res.status(401).json({error:true, msg:'User not authenticated'});
    }


    const documents=await Document.find({owner:user._id}).select('name');
    if(!documents){
        return res.status(500).json({error:true, msg:'Internal Server Error'});
    }
    return res.status(200).json({error:false, msg:'Documents Fetched Successfully', data:documents});
}

exports.deletedoc=async(req,res,next)=>{
    const {mobileNo, password,id}=req.body;
    let user=await User.findOne({mobileNo:mobileNo});
    if(!user) {
        return res.status(404).json({error:true, msg:'User Not Found'});
    }
    if(user.password !== password){
        return res.status(401).json({error:true, msg:'User not authenticated'});
    }

    const document = Document.findById(id);
  

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
  
 
    if (document.owner !== req.user) {
      return res.status(403).json({ error: 'Permission denied' });
    }

    await Document.findByIdAndDelete(id);

    res.status(201).json({
        success:true,
    })
}

exports.getshareddoc=async(req,res,next)=>{
    const {id}=req.body;
    

    const documents=await Document.findById(id).select('permissibleuser');
    if(!documents){
        return res.status(500).json({error:true, msg:'Internal Server Error'});
    }
    return res.status(200).json({error:false, msg:'Documents Fetched Successfully', data:documents});
}


exports.createshared=async(req,res,next)=>{
    const {mobileNo, password, _id, mobNumbers}=req.body;
        
        let user=await User.findOne({mobileNo:mobileNo});

        if(user.password !== password){
            return res.status(401).json({error:true, msg:'User not authenticated'});
        }

        let document=await Document.findById(_id);
        if(!document){
            return res.status(404).json({error:true, msg:'Document Not Found'});
        }
       

        let updated= await Document.findByIdAndUpdate(_id,{permissibleuser:mobNumbers})
        if(!updated){
            return res.status(404).json({error:true, msg:'Not updated'});
        }

        res.status(201).json({
            success:true,
        })
}


exports.getalldoc=async(req,res,next)=>{
    const {mobileNo,password}=req.body;
    let user=await User.findOne({mobileNo:mobileNo});
    if(!user) {
        return res.status(404).json({error:true, msg:'User Not Found'});
    }
    if(user.password !== password){
        return res.status(401).json({error:true, msg:'User not authenticated'});
    }

    const documents=await Document.find({ permissibleuser: { $in: mobileNo } })
    .exec();

    if(!documents){
        return res.status(500).json({error:true, msg:'Internal Server Error'});
    }
    return res.status(200).json({error:false, msg:'Documents Fetched Successfully', data:documents});
}

exports.getallshareddoc=async(req,res,next)=>{
    const {documentId, mobileNo, password}=req.body;
        let user=await User.findOne({mobileNo:mobileNo});
        if(!user) {
            return res.status(404).json({error:true, msg:'User Not Found'});
        }
       
        if(user.password !== password){
            return res.status(401).json({error:true, msg:'User not authenticated'});
        }
        let document=await Document.findById(documentId);
    
        if(!document){
            return res.status(404).json({error:true, msg:'Document Not Found'});
        }


        let checkAccess=false;
        document.permissibleuser.map((ele)=>{
            if(ele === mobileNo){
                checkAccess=true;
                return ;
            }
        })

        if(checkAccess || document.owner.equals(user._id) ){
            return res.status(200).json({error:false, msg:'Documet Fetched Successfully', data:document.document});
        }
        else{
            return res.status(400).json({error:false, msg:'Document Access Denied'})
        }
}