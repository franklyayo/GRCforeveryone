// src/models/Control.ts
import mongoose, { Schema, model, models } from "mongoose";

const ControlSchema = new Schema(
  {
    controlId: { type: String, required: true }, // e.g., "CC1.1" or "A.5.1"
    title: { type: String, required: true },
    framework: { 
      type: String, 
      required: true,
      enum: ["ISO 27001", "SOC 2", "NIST CSF", "GDPR", "Custom"]
    },
    status: { 
      type: String, 
      required: true, 
      enum: ["Implemented", "In Progress", "Testing", "Failed", "Not Started"],
      default: "Not Started"
    },
    description: { type: String },
  },
  { timestamps: true }
);

const Control = models.Control || model("Control", ControlSchema);

export default Control;
