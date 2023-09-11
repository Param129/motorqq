const express = require("express");
const {
  createdocument,
  getdoc,
  deletedoc,
  getshareddoc,
  createshared,
  getalldoc,
  getallshareddoc,
} = require("../controller/documentcontroller");
const { authenticate, authorizeRoles } = require("../middleware/auth");
const router = express.Router();


router.use(express.json());

function paginateMiddleware(req, res, next) {
  req.page = parseInt(req.query.page) || 1; 
  req.limit = parseInt(req.query.limit) || 10; 
  next();
}


router.route("/upload").post(createdocument);


router.route("/getdoc/").get(paginateMiddleware, getdoc);


router.route("/delete").delete(deletedoc);


router.route("/getshared").get(paginateMiddleware, getshareddoc);


router.route("/createshared").post(createshared);


router.route("/getalldoc").get(paginateMiddleware, getalldoc);


router.route("/getallshared").get(paginateMiddleware, getallshareddoc);

module.exports = router;
