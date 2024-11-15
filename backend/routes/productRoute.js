const {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    searchProductByUser,
    getProductByUserId,
  } = require("../controller/productController");
  
  const router = require("express").Router();
  
  // crud always
  
  // create product
  // read product get
  // update product
  // delete product
  router.post("/create", createProduct);
  router.get("/", getProduct);
  router.put("/:id", updateProduct);
  router.delete("/:id", deleteProduct);
  router.get("/search",searchProductByUser)
  router.get("/user/:userId", getProductByUserId)
  
  
  module.exports = router;