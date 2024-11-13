const { reduceQuantityOfProduct } = require("../controller/productController");
const {
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  myTransaction,
  getTransactionOfUser,
} = require("../controller/transactionController");

const router = require("express").Router();

// crud
router.post("/create", createTransaction,reduceQuantityOfProduct);
router.get("/", getTransaction);
router.get("/user", getTransactionOfUser);
router.put("/:id", updateTransaction);
router.get("/mytransaction/:id", myTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;