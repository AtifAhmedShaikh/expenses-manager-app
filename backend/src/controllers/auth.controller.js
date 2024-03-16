import {Response}from "../utils/Response.js"
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
  res.cookie("accessToken", accessToken, { httpOnly: true });

  new Response(
    201,
    { user: createdUser },
    "Organization has created successfully and your finance Manager",
  ).send(res);
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(404, "user not found !, Invalid credentials");
  }
  const isValidPassword = await user.isCorrectPassword(password);
  if (!isValidPassword) {
    throw new ApiError(404, "user not found !, Invalid credentials");
  }

  const accessToken = user.generateAccessToken();
  res.cookie("accessToken", accessToken, { httpOnly: true });

  new Response(201, { user }, "you have been login successfully in your organization ").send(res);
});

const logoutUser = asyncHandler(async (req, res) => {
  // clear user cookies
  res.clearCookie("accessToken");
  new Response(201, {}, "you are logout successfully !").send(res);
});

export { registerUser, loginUser, logoutUser };
