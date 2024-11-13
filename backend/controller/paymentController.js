const User = require("../models/userModel");
const StripeService = require("../services/stripeService");
const createStripeCheckoutSession = async (req, res, next) => {
  const { userId, quantity, productId, totalAmount } = req.body;
  try {
    if (!userId) {
      throw new Error("Please provide user id");
    }
    const userExist = await User.findById(userId);
    if (!userExist) {
      throw new Error("User not found");
    }
    console.log(totalAmount);
    const checkoutRes = await StripeService.createStripeCheckout(
      userExist.email,
      totalAmount
    );

    if (!checkoutRes || !checkoutRes.id) {
      throw new Error("Stripe checkout session creation failed.");
    }

    res.status(200).json({
      url: checkoutRes.url,
      success_url: checkoutRes.success_url,
      failure_url: checkoutRes.cancel_url,
    });
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};

const confirmStripeCheckoutSession = async (req, res) => {
  const { stripe_session_id } = req.body;
  try {
    const session = await StripeService.confirmStripeCheckout(
      stripe_session_id
    );

    if (session.data?.payment_status !== "paid") {
      throw new Error("Payment failed ");
    }

    return res.status(200).json({ message: "session confirmation success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};

const PaymentController = {
  createStripeCheckoutSession,
  confirmStripeCheckoutSession,
};
module.exports = PaymentController;
