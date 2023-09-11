const express=require("express");
const { registeruser, getallUser,login } = require("../controller/usercontroller")
const router=express.Router();

router.route("/signup").post(registeruser)
router.route("/getusers").get(getallUser)
router.route("/login").post(login)
module.exports=router;