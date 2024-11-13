const express = require("express");
const PaymentController = require("../controller/paymentController");
const { createTransaction } = require("../controller/transactionController");
const { reduceQuantityOfProduct } = require("../controller/productController");
const router = express.Router();
router.post("/checkout", PaymentController.createStripeCheckoutSession,createTransaction,reduceQuantityOfProduct);
router.post(
    "/confirm-checkout-session",
    PaymentController.confirmStripeCheckoutSession,
  );
  module.exports = router;