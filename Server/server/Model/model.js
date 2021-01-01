const mongoose = require("mongoose");

const productsModel = mongoose.Schema({
  
  productName:{
      type:String,
      required:true
    },
    productPrice:{
      type:Number,
      required:true
    },  
    productDescription:{
      type:String,
      required:true
    }
});

(module.exports = mongoose.model(
  "ProductsModel",
  productsModel
));
