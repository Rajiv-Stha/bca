const stripe = require("../utils/stripe");

const createStripeCheckout = async (email, totalAmount) => {
  console.log(totalAmount)
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}&type=stripe`,
      cancel_url: `${process.env.FRONTEND_URL}/failure?session_id={CHECKOUT_SESSION_ID}&type=string`,
   payment_method_types: ['card'], // You can add other types if needed
      line_items: [
        {
          price_data: {
            currency: 'npr',
            product_data: {
              name: '-', // Replace with your product name
            },
            unit_amount: totalAmount*100, // Amount in cents (e.g., 2000 = $20)
          },
          quantity: 1,
        },
      ],
      mode: 'payment', 
      customer_email: email,
    });
    return session;
  } catch (error) {
    console.log(error);
    throw new Error("stripe checkout error");
  }
};

async function confirmStripeCheckout(session_id) {
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    return {
      success: true,
      data: session,
    };
  } catch (e) {
    console.log(e);
    throw new Error("stripe session confirmation error");
  }
}



const StripeService = {
 
  createStripeCheckout,
  confirmStripeCheckout,


};
module.exports = StripeService;