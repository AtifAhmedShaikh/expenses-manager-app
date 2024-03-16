import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { UserModel } from "../models/User.model.js";
import { OrganizationModel } from "../models/Organization.model.js";
import { generateRandomString } from "../helpers/randomStringGenerator.js";
import { OWNER } from "../constants/index.js";
import { Response } from "../utils/Response.js";
import { sendEmail } from "../utils/mailer.js";
import Jwt from "jsonwebtoken";
import {
  INVITATION_TOKEN_SECRET,
  SERVER_DOMAIN,
  SMTP_FROM_NAME,
  SMTP_FROM_EMAIL,
} from "../config/envManager.js";

// when owner has accept the invite then add him to corresponding organization
const acceptInvitationByOwner = asyncHandler(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    throw new ApiError(500, "Invitation token not found !");
  }

  try {
    const decodedToken = Jwt.verify(token, INVITATION_TOKEN_SECRET);

    const addOwnerToOrganization = await OrganizationModel.updateOne(
      { _id: decodedToken?.organization },
      { $push: { owners: decodedToken?.owner } },
      { new: true },
    );
    if (!addOwnerToOrganization) throw new ApiError(500, "Invalid Invitation token ");
  } catch (error) {
    throw new ApiError(500, "Invalid Invitation token ");
  }

  new Response(201, {}, "new owner has added in organization ").send(res);
});

// send the invitation to new owners by finance manager of organization
const sendInvitationToOwner = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const isExistingEmail = await UserModel.findOne({ email });
  if (isExistingEmail) {
    throw new ApiError(400, "Email is already exists, use another email ");
  }
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // email validation
  if (!emailPattern.test(email)) {
    throw new ApiError(400, "Please enter valid email address");
  }
  const randomString = generateRandomString();
  const createdOwner = await UserModel.create({
    username: randomString,
    email: email,
    password: randomString,
    role: OWNER,
  });

  if (!createdOwner) {
    throw new ApiError(500, "Something went wrong while creating owner");
  }

  const tokenPayload = {
    organization: req.organization._id,
    owner: createdOwner._id,
  };

  const token = Jwt.sign(tokenPayload, INVITATION_TOKEN_SECRET);

  const mailResponse = await sendEmail({
    from: `${SMTP_FROM_NAME} <${SMTP_FROM_EMAIL}>`,
    to: "atifahmad2219@gmail.com",
    subject: "Invitation Email",
    template: "InvitationTemplate",
    context: {
      link: `${SERVER_DOMAIN}/api/invitations/accept-invite/${token}`,
    },
  });
  if (!mailResponse) {
    throw new ApiError(500, "Something went wrong, Please try again ");
  }
  new Response(201, {}, "Invite has sended successfully to new owner ").send(res);
});

export { acceptInvitationByOwner, sendInvitationToOwner };
