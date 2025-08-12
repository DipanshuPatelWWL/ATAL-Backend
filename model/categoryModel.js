const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const catemodel = new mongoose.Schema(
  {
    categoryname: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
const product = new mongoose.Schema(
  {
    pro_name: String,
    p_price: Number,
    s_price: Number,
    cat_sec: [String],
    image: String,
    framematerial:String,
    frameshape:String,
    framecolor:String,
    framefit:String,
    gender:String,
    description:String,
    lenstitle1:String,
    lensdescription1:String,
    lensimage1:String,
    lenstitle2:String,
    lensdescription2:String,
    lensimage2:String,
  },
  {
    timestamps: true,
  }
);
const coffee = new mongoose.Schema(
  {
    categoryname: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    ingredients: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const adminmodel = new mongoose.Schema(
  {
    email: String,
    password: String,
    tokenversin: Number,
  },
  {
    timestamps: true,
  }
);

const Newcategory = mongoose.model("Categories", catemodel);
const NewProduct = mongoose.model("Products", product);
const CoofeeIngrient = mongoose.model("Coffee", coffee);
const Admin = mongoose.model("Admin", adminmodel);
module.exports = { Newcategory, NewProduct, Admin, CoofeeIngrient };
