import { asyncHandler } from "../utils/asyncHandler.js";
import { UserModel } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { FINANCE_MANAGER } from "../constants/index.js";
import { OrganizationModel } from "../models/Organization.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, orgName } = req.body;
  // ensure provided username or email and  organization name is not already exist
  const isExistedUser = await UserModel.findOne({ $or: [{ email }, { username }] });
  const isExistedOrg = await OrganizationModel.findOne({ name: orgName });
  if (isExistedUser) {
    throw new ApiError(409, "username or email has already exist use another username and email");
  }
  if (isExistedOrg) {
    throw new ApiError(409, "Organization name has already exist please use another one name");
  }
  const createdUser = await UserModel.create({
    username,
    email,
    role: FINANCE_MANAGER,
    password,
  });
  // now create his org
  const createdOrg = await OrganizationModel.create({
    name: orgName,
    financeManager: createdUser._id, // attach user as a finance manager
  });
  const accessToken = createdUser.generateAccessToken();
  res.status(201).cookie("accessToken", accessToken).json({
    success: true,
    message: "your organization has created !",
    user: createdUser,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await UserModel.findOne({ email });
  console.log("Here", user);
  if (!user) {
    throw new ApiError(404, "user not found !, Invalid credentials");
  }
  const isValidPassword = await user.isCorrectPassword(password);
  if (!isValidPassword) {
    throw new ApiError(404, "user not found !, Invalid credentials");
  }

  const accessToken = user.generateAccessToken();
  res.status(200).cookie("accessToken", accessToken).json({
    success: true,
    message: "you have been login successfully in your organization  !",
    user,
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  // clear user cookies
  res.clearCookie("accessToken");
  res.status(200).json({
    success: true,
    message: "you are logout successfully !",
  });
});

export { registerUser, loginUser, logoutUser };
