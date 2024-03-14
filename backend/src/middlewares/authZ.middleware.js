import { FINANCE_MANAGER } from "../constants/index.js";
import { UserModel } from "../models/User.model.js";
import { OrganizationModel } from "../models/Organization.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// middleware to ensure that the transaction has add,update an delete by only financeManager of organization
const isFinanceManager = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const user = await UserModel.findById(userId);
  if (user?.role !== FINANCE_MANAGER) {
    throw new ApiError(401, "only finance manager has allow to add or modify the transaction ");
  }
  // find the organization of this finance manager
  const organization = await OrganizationModel.findOne({ financeManager: user._id });
  if (!organization) {
    throw new ApiError(401, "organization not found ");
  }
  req.organization = organization; // attach org
  next();
});

export { isFinanceManager };
