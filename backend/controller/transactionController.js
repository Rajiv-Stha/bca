const transactionModel = require("../models/transactionModel");
const Emailservice = require("../services/Emailservice");

const createTransaction = async (req, res, next) => {
  const { buyerEmail, sellerEmail, buyerUsername } = req.body.data;
  console.log(req.body);
  try {
    let newTransation = await transactionModel.create(req.body.data);
    newTransation = await newTransation.populate([
      "buyer",
      "seller",
      "product",
    ]);

    await Emailservice.sentBuyEmail(sellerEmail, buyerEmail, buyerUsername);
    // res.status(200).json({ message: newTransation, success: true });
    next();
  } catch (error) {
    console.log("error while creating transaction", error);
    next(error);
  }
};

const getTransaction = async (req, res, next) => {
  try {
    const allTransaction = await transactionModel
      .find(req.query)
      .populate(["buyer", "seller", "product"]);
    return res.status(200).json({ message: allTransaction });
  } catch (error) {
    next(error);
  }
};

const getTransactionOfUser = async (req, res, next) => {
  const { buyer, userId } = req.query;
  console.log(buyer, userId);
  let allTransaction = [];

  try {
    if (buyer) {
      allTransaction = await transactionModel
        .find({
          buyer: userId,
        })
        .populate(["buyer", "seller", "product"]);
    } else {
      allTransaction = await transactionModel
        .find({
          seller: userId,
        })
        .populate(["seller", "product", "buyer"]);
    }

    res.status(200).json({ message: allTransaction, success: true });
  } catch (error) {
    next(error);
  }
};

const updateTransaction = async (req, res, next) => {
  const transactionId = req.params.id;
  try {
    const updatedTransaction = await transactionModel
      .findByIdAndUpdate(
        {
          _id: transactionId,
        },
        {
          $set: req.body,
        },
        {
          returnDocument: true,
          new: true,
        }
      )
      .populate(["buyer", "seller", "product"]);
    return res.status(200).json({ message: updatedTransaction });
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  const transactionId = req.params.id;
  try {
    await transactionModel.deleteOne({ _id: transactionId });
    return res.status(200).json({ message: "successfully deleted" });
  } catch (error) {
    next(error);
  }
};

const myTransaction = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userTransactin = await transactionModel
      .find({
        $or: [
          { buyer: userId },
          {
            seller: userId,
          },
        ],
      })
      .populate(["buyer", "seller", "product"]);
    res.status(200).json({ message: userTransactin });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  myTransaction,
  getTransactionOfUser,
};
