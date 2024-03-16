import { INCOMING_TRANSACTION, OUTGOING_TRANSACTION } from "../constants/index.js";

// calculate the total amount of incoming and outgoing transactions
export const calculateTotalTransactionAmount = transactions => {
  const incomingTotal = transactions
    .filter(item => item.type === OUTGOING_TRANSACTION)
    .map(item => item.amount)
    .reduce((total, curr) => total + curr, 0);

  const outgoingTotal = transactions
    .filter(item => item.type === INCOMING_TRANSACTION)
    .map(item => item.amount)
    .reduce((total, curr) => total + curr, 0);

  return { incomingTotal, outgoingTotal };
};
