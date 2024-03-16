import express from "express";
import {
  restrictedToFinanceManager,
  attachCurrentUserOrganization,
} from "../middlewares/authZ.middleware.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import {
  acceptInvitationByOwner,
  sendInvitationToOwner,
} from "../controllers/invitation.controller.js";

const router = express.Router();

// invitation can only send by the finance manager of organization
router
  .route("/send-invite")
  .post(
    authenticateUser,
    attachCurrentUserOrganization,
    restrictedToFinanceManager,
    sendInvitationToOwner,
  );

router.route("/accept-invite/:token").get(acceptInvitationByOwner);

export default router;
