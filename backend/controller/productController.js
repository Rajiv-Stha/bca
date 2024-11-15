const productModel = require("../models/productModel");

const createProduct = async (req, res, next) => {
  try {
    const newProduct = await productModel.create(req.body);
    return res.status(200).json({ message: newProduct });
  } catch (error) {
    next(error);
  }
};
const getProduct = async (req, res, next) => {
  const { category, _id, status } = req.query;
  let query = {};

  // Build query based on provided parameters
  if (category) query.category = category;
  if (_id) query._id = _id;
  
  // Check if status is an array, and use $in operator if it is
  if (status) {
    query.status = Array.isArray(status) ? { $in: status } : status;
  }

  try {
    const products = await productModel.find(query).populate("owner");
    return res.status(200).json({ message: products, success: true });
  } catch (error) {
    next(error);
  }
};


const reduceQuantityOfProduct = async (req, res, next) => {
  const { product, quantity } = req.body.data;
  try {
    await productModel.findByIdAndUpdate(
      product,
      {
        $inc: { quantity: -quantity },
      },
      {
        new: true,
        returnDocument: true,
      }
    );
    console.log("successfully reduced quantity of product")
    // res.status(200).json({ message: "transaction successfull", success: true });
  } catch (error) {
    // next(error);
    console.log("error while reducing quanity",error)
  }
};

const updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      {
        _id: productId,
      },
      {
        $set: req.body,
      },
      {
        returnDocument: true,
        new: true,
      }
    );
    return res.status(200).json({ message: updatedProduct });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;
  try {
    await productModel.deleteOne({ _id: productId });
    return res.status(200).json({ message: "successfully deleted" });
  } catch (error) {
    next(error);
  }
};

const searchProductByUser = async (req, res, next) => {
  try {
    const searchedProduct = await productModel.find({
      $or: [
        {
          name: { $regex: req.query.search, $options: "i" },
        },
        { desc: { $regex: req.query.search, $options: "i" } },
      ],
    });

    res.status(200).json({ message: searchedProduct, success: true });
  } catch (error) {
    next(error);
  }
};

const getProductByUserId = async (req, res,next) => {
  const { userId } = req.params; // Extract userId from URL params

  try {
    // Fetch products owned by the specified user
    const products = await productModel.find({ owner: userId }).populate("owner", "name email"); // Populate owner details if needed

    res.status(200).json(products);
  } catch (error) {
    next(error)
  }
};


module.exports = {
  createProduct,
  reduceQuantityOfProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProductByUser,
  getProductByUserId
};
