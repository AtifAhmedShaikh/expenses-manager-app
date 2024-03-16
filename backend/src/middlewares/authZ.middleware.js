import { FINANCE_MANAGER } from "../constants/index.js";
import { UserModel } from "../models/User.model.js";
import { OrganizationModel } from "../models/Organization.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// middleware to ensure that the transaction has add,update an delete by only financeManager of organization
const restrictedToFinanceManager = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const user = await UserModel.findById(userId);
  if (user?.role === FINANCE_MANAGER) return next();
  throw new ApiError(401, "only finance manager has allow to add or modify the transaction ");
});

// middleware to check the current user right access to view their transaction
const attachCurrentUserOrganization = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  // find the organization where the current user is either the finance manager or exists in owners array
  const organization = await OrganizationModel.findOne({
    $or: [{ financeManager: userId }, { owners: userId }],
  });

  if (!organization) {
    throw new ApiError(401, "organization not found ");
  }
  req.organization = organization; // attach org
  next();
});

export { restrictedToFinanceManager, attachCurrentUserOrganization };
