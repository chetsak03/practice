const router = require("express").Router();
const ProductsModel = require("../Model/model");

router.post("/addProduct", (req, res, next) => {
  console.log(req.body)
    let newProductDetails = new ProductsModel({
      productName: req.body.productName,
      productPrice:req.body.productPrice,
      productDescription:req.body.productDescription
    });
  
    newProductDetails.save((err, detail) => {
      if (err) {
        res.json(err);
      } else {
        res.json(res.statusCode);
      }
    });
  });

  router.get("/getallProducts", (req, res, next) => {
    ProductsModel.find(function(err, details) {
      if (err) {
        res.json(err);
      } else {
        res.json(details);
      }
    });
  });

  
router.delete("/deleteProduct/:id", (req, res, next) => {
console.log(req.params.id)
ProductsModel.remove({_id: req.params.id}, function(err, result) {
  console.log("in del")
  if (err) {
    res.json(err);
    console.log(err)
  } else {
    res.json(result);
    console.log(result)
  }
});
});

  module.exports = router;