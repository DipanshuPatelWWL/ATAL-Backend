const express = require("express");
const router = express.Router();
const upload = require("../middleware");
const {
  catogorydata,
  getcatogory,
  deleteCategory,
  updateCategory,
  Productadd,
  getproduct,
  deleteProduct,
  updateProduct,
  fogetAdminpass,
  updatesdminpassword,
  login
} = require("../controllers/categoryControllar");

router.post("/addcategory/", catogorydata);
router.get("/getcategory/", getcatogory);
router.delete("/deletecategory/:id", deleteCategory);
router.put("/updatecategory/:id", updateCategory);
router.post("/addproduct", upload.single("image"), Productadd);
router.get("/getproduct", getproduct);
router.delete("/deleteproduct/:id", deleteProduct);
router.put("/updateproduct/:id", upload.single("image"), updateProduct);
router.post("/forgetpassword", fogetAdminpass);
router.put("/passworupdate", updatesdminpassword);
router.post("/login", login);
module.exports = router;
