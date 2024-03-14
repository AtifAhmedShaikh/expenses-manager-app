import { TransactionModel } from "../models/Transaction.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// retrieve all transaction of specific organization
const getAllTransaction = asyncHandler(async (req, res) => {
  const orgId = req.params; // get organization Id
  const transactions = await TransactionModel.find({ organization: orgId });
  // if no transaction exists in this organization
  if (!transactions?.length) {
    throw new ApiError(400, "There is no transaction in organization ");
  }
  res.status(200).json({
    success: true,
    message: "Transaction are fetched successfully ",
    transactions,
  });
});

const addTransaction = asyncHandler(async (req, res) => {
  const { type, amount, reason, source } = req.body;
  if ((!type || !amount) && !(source && amount)) {
    throw new ApiError(400, "Please Enter Transaction type,amount and corresponding details ");
  }
  const organization = req.organization._id;
  const createdTransaction = await TransactionModel.create({
    organization,
    type,
    reason,
    source,
    amount,
  });
  res.status(200).json({
    success: true,
    message: "Transaction added successfully ",
    data: createdTransaction,
  });
});

const editTransaction = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;
  const updatedTransactionInfo = req.body;
  const updatedTransaction = await TransactionModel.findByIdAndUpdate(
    transactionId,
    { $set: { ...updatedTransactionInfo } },
    { new: true },
  );
  if (!updatedTransaction) {
    throw new ApiError(500, "Something went wrong while Updating the transaction ");
  }
  res.status(200).json({
    success: true,
    message: "Transaction has updated successfully !",
  });
});

const deleteTransaction = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;
  const deletedTransaction = await TransactionModel.findByIdAndDelete(transactionId);
  if (!deletedTransaction) {
    throw new ApiError(500, "Something went wrong while deleting the transaction ");
  }

  res.status(200).json({
    success: true,
    message: "Transaction Deleted successfully ",
  });
});

export { getAllTransaction, addTransaction, editTransaction, deleteTransaction };
