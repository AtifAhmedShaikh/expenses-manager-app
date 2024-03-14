import Jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UserModel } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ACCESS_TOKEN_SECRET } from "../config/envManager.js";

const authenticateUser = asyncHandler(async (req, _,next) => {
  // extract access token from cookies or request header
  const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError(401, "your are unAuthorized, token not found !");
  }
  const decoded = Jwt.verify(token, ACCESS_TOKEN_SECRET);
  const user = await UserModel.findById(decoded?._id);
  if (!user) {
    throw new ApiError(401, "your are unAuthorized, Invalid access token !");
  }
  req.user = user;
  next();
});

export { authenticateUser };
