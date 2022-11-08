import express from "express";
import * as complaintsController from "../controllers/complaints";
import { ensureAdmin } from "../middlewares/auth";
import { ensureOwnership } from "../middlewares/esnureOwnership";

const router = express.Router();

// @route   GET /
// @desc    Get Complaints
// @access  Private
router.get("/", ensureAdmin, complaintsController.getAllComplaints)

// @route   GET /user/:id
// @desc    Get User Complaints
// @access  Private
router.get("/user/:id", ensureOwnership, complaintsController.getUserComplaints)

// @route   GET /:id
// @desc    Get Single Complaint
// @access  Private
router.get("/:id", complaintsController.getSingleComplaint)

// @route   POST /
// @desc    Create Complaint
// @access  Private
router.post("/", complaintsController.createComplaint);

// @route   PATCH /:id
// @desc    Update Complaint
// @access  Private
router.patch("/:id", complaintsController.updateComplaint);

// @route   DELETE /:id
// @desc    Update Complaint
// @access  Private
router.delete("/:id", complaintsController.deleteComplaint);

export default router;
