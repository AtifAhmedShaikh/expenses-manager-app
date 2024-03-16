import { isValidObjectId } from "mongoose";
import { Response } from "../utils/Response.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  findOrganizationTransactions,
  createTransaction,
  editTransactionById,
  deleteTransactionById,
  sendEmailToOwners,
} from "../services/transaction.service.js";

// retrieve all transactions and total amounts of specific organization
const getOrganizationTransactions = asyncHandler(async (req, res) => {
  const orgId = req.organization._id; // get organization Id
  const userId = req.user._id;
  const transactionsDetails = await findOrganizationTransactions(orgId, userId);

  new Response(200, { transactionsDetails }, "Transaction fetched successfully !").send(res);
});

const addTransaction = asyncHandler(async (req, res) => {
  const { type, amount, reason, source } = req.body;
  if ((!type || !amount) && !(source && amount)) {
    throw new ApiError(400, "Please Enter Transaction type,amount and corresponding details ");
  }
  const orgId = req.organization._id; // get organization id
  const createdTransaction = await createTransaction({
    organization: orgId,
    type,
    reason,
    source,
    amount,
  });
  if (!createdTransaction) {
    throw new ApiError(400, "Something went wrong while adding transaction , try agin ");
  }
  // inform all owners by sending email
  await sendEmailToOwners(orgId, "Transaction created in your org !");
  new Response(201, {}, "Transaction added successfully !").send(res);
});

const editTransaction = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;

  if (!isValidObjectId(transactionId)) {
    throw new ApiError(400, "Invalid transaction Id");
  }

  const updatedTransactionInfo = req.body;
  const updatedTransaction = await editTransactionById(transactionId, updatedTransactionInfo);
  if (!updatedTransaction) {
    throw new ApiError(500, "Something went wrong while Updating the transaction ");
  }
  // inform all owners by sending email
  await sendEmailToOwners(req.organization._id, "Finance Manager has Update the Transaction !");
  new Response(200, {}, "Transaction Updated successfully !").send(res);
});

const deleteTransaction = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;

  if (!isValidObjectId(transactionId)) {
    throw new ApiError(400, "Invalid transaction Id");
  }

  const deletedTransaction = await deleteTransactionById(transactionId);
  if (!deletedTransaction) {
    throw new ApiError(500, "Something went wrong while deleting the transaction ");
  }
  // inform all owners by sending email
  await sendEmailToOwners(
    req.organization._id,
    "Finance Manager has Deleted the Transaction org !",
  );
  new Response(201, {}, "Transaction deleted successfully !").send(res);
});

export { getOrganizationTransactions, addTransaction, editTransaction, deleteTransaction };
