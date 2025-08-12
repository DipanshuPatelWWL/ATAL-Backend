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
  login,
  coffeedata,
  getcoffee,
  deleteCoffee,
  updateCoffee,
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
router.post("/coffeeadd", coffeedata);
router.get("/getcoffee", getcoffee);
router.delete("/deletecoffee/:id", deleteCoffee);
router.put("/updatecoffee/:id", updateCoffee);
router.post("/login", login);
module.exports = router;
