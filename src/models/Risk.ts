// models/Risk.ts
import mongoose, { Schema, model, models } from "mongoose";

const RiskSchema = new Schema(
  {
    title: { type: String, required: true },
    level: { 
      type: String, 
      required: true, 
      enum: ["Critical", "High", "Medium", "Low"] 
    },
    status: { 
      type: String, 
      required: true, 
      enum: ["Open", "Mitigated", "Accepted"],
      default: "Open"
    },
    description: { type: String },
  },
  { timestamps: true }
);

// Prevent Mongoose from recompiling the model upon hot reloads
const Risk = models.Risk || model("Risk", RiskSchema);

export default Risk;
