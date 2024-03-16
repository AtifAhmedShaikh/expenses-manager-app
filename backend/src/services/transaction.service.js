import mongoose from "mongoose";
import { OrganizationModel } from "../models/Organization.model.js";
import { TransactionModel } from "../models/Transaction.model.js";
import { sendEmail } from "../utils/mailer.js";
import { SMTP_FROM_NAME, SMTP_FROM_EMAIL } from "../config/envManager.js";
import { INCOMING_TRANSACTION, OUTGOING_TRANSACTION } from "../constants/index.js";
import { calculateTotalTransactionAmount } from "../helpers/calculationHelper.js";

// retrieve all transaction of the specific organization
export const findOrganizationTransactions = async orgId => {
  const transactions = await TransactionModel.find({ organization: orgId });

  const { incomingTotal, outgoingTotal } = calculateTotalTransactionAmount(transactions);

  return { transactions, incomingTotal, outgoingTotal };
};

export const createTransaction = async data => {
  return await TransactionModel.create({ ...data });
};

export const editTransactionById = async (id, updatedTransactionInfo) => {
  return await TransactionModel.findByIdAndUpdate(
    id,
    { $set: { ...updatedTransactionInfo } },
    { new: true },
  );
};

export const deleteTransactionById = async id => {
  return await TransactionModel.findByIdAndDelete(id);
};

// send email to all owners of provided organization by id to inform about the transaction happen
export const sendEmailToOwners = async (organizationId, message) => {
  const organization = await OrganizationModel.findById(organizationId).populate("owners", "email");

  return await sendEmail({
    from: `${SMTP_FROM_NAME} <${SMTP_FROM_EMAIL}>`,
    // to: [...organization.owners.map(e => e.email)],
    to: "atifahmad2219@gmail.com",
    subject: "Transaction Notify Email ",
    template: "NotifyTemplate",
    context: {
      message: message,
    },
  });
};
