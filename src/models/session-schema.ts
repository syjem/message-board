import { Schema, model, models } from "mongoose";

const sessionSchema = new Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    expiration: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

sessionSchema.index({ expiration: 1 }, { expireAfterSeconds: 0 });

export const Session = models.Session || model("Session", sessionSchema);
