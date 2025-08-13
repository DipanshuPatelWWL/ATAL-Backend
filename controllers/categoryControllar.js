const {
  Newcategory,
  NewProduct,
  Admin
} = require("../model/categoryModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const sendResetEmail = require("../utils/sendMail");

const categorySchema = Joi.object({
  categoryname: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Category name cannot be empty!",
    "any.required": "Category name is required!",
    "string.min": "Category name must be at least 2 characters",
    "string.max": "Category name must be less than 50 characters",
  }),
});

const catogorydata = async (req, res) => {
  try {
    // Validate the input
    const { error } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
        success: false,
        status: 400,
      });
    }

    const { categoryname } = req.body;

    const result = new Newcategory({
      categoryname: categoryname,
    });

    const data = await result.save();

    if (data) {
      return res.status(200).json({
        message: "Successfully added",
        success: true,
        data: data,
        status: 200,
      });
    } else {
      return res.status(400).json({
        message: "Not added",
        success: false,
        status: 400,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
      error: error.message,
      status: 500,
    });
  }
};

const getcatogory = async (req, res) => {
  try {
    const data = await Newcategory.find();
    if (data) {
      return res.status(200).json({
        message: "sucessfully added",
        success: true,
        data: data,
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Not added",
      success: true,
      error: error,
      status: 200,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid category ID",
        success: false,
        status: 400,
      });
    }
    const data = await Newcategory.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
        status: 404,
      });
    }

    return res.status(200).json({
      message: "Category deleted successfully",
      success: true,
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({
      message: "Error deleting category",
      success: false,
      error: error.message,
      status: 500,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryname } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid category ID",
        success: false,
        status: 400,
      });
    }
    const data = await Newcategory.findByIdAndUpdate(
      id,
      { categoryname },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
        status: 404,
      });
    }

    return res.status(200).json({
      message: "Category updated successfully",
      success: true,
      data,
      status: 200,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({
      message: "Error updating category",
      success: false,
      error: error.message,
      status: 500,
    });
  }
};

const Productadd = async (req, res) => {
  try {
    const {
      pro_name,
      p_price,
      s_price,
      cat_sec,
      framematerial,
      frameshape,
      framecolor,
      framefit,
      gender,
      description,
      lenstitle1,
      lensdescription1,
      lensimage1,
      lenstitle2,
      lensdescription2,
      lensimage2,
    } = req.body;
    console.log(req.file);
    const result = new NewProduct({
      pro_name,
      p_price,
      s_price,
      cat_sec: Array.isArray(cat_sec) ? cat_sec : [cat_sec],
      image: req.file ? req.file.filename : null,
      framematerial,
      frameshape,
      framecolor,
      framefit,
      gender,
      description,
      lenstitle1,
      lensdescription1,
      lensimage1,
      lenstitle2,
      lensdescription2,
      lensimage2,
    });

    const data = await result.save();

    res.status(200).json({
      message: "Product added successfully",
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(400).json({
      message: "Failed to add product",
      success: false,
      error: error.message,
    });
  }
};

const getproduct = async (req, res) => {
  try {
    const data = await NewProduct.find();
    if (data) {
      return res.status(200).json({
        message: "sucessfully added",
        success: true,
        data: data,
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Not added",
      success: true,
      error: error,
      status: 200,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Product ID",
        success: false,
        status: 400,
      });
    }
    const data = await NewProduct.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
        status: 404,
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
      success: true,
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting Product:", error);
    return res.status(500).json({
      message: "Error deleting product",
      success: false,
      error: error.message,
      status: 500,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { pro_name, p_price, s_price, cat_sec, image } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
        success: false,
        status: 400,
      });
    }
    const data = await NewProduct.findByIdAndUpdate(
      id,
      {
        pro_name,
        p_price,
        s_price,
        cat_sec,
        image: req.file ? req.file.filename : image,
      },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
        status: 404,
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      success: true,
      data,
      status: 200,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      message: "Error updating product",
      success: false,
      error: error.message,
      status: 500,
    });
  }
};

const fogetAdminpass = async (req, res) => {
  try {
    const { email } = req.body;

    const data = await Admin.find({ email });

    if (!data) {
      return res.status(404).json({
        message: "Admin not found",
        success: false,
        status: 404,
      });
    }

    const token = jwt.sign(
      {
        id: data[0]?._id,
        email: data[0]?.email,
      },
      "JWT_SECRET",
      {
        expiresIn: "1h",
      }
    );
    const resetLink = `http://localhost:5173/Resetpassword/${token}`;
    await sendResetEmail(email, resetLink);
    return res.status(200).json({
      message: "Email Send successfully",
      success: true,
      data,
      status: 200,
    });
  } catch (error) {
    console.error("Error to Email Send:", error);
    return res.status(500).json({
      message: "Error to Email Send",
      success: false,
      error: error.message,
      status: 500,
    });
  }
};

const updatesdminpassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const decoded = jwt.verify(token, "JWT_SECRET");

    const userId = decoded.id;

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
        success: false,
        status: 404,
      });
    }

    return res.status(200).json({
      message: "Password updated successfully",
      success: true,
      data: admin,
      status: 200,
    });
  } catch (error) {
    console.error("Error updating password:", error);

    return res.status(500).json({
      message: "Invalid or expired token",
      success: false,
      error: error.message,
      status: 500,
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Admin.findOne({ email: username });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, "JWT_SECRET", { expiresIn: "1d" });

    res.json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
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
};
