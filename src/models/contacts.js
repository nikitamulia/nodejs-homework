import mongoose, { SchemaTypes } from "mongoose";

const { Schema } = mongoose;
const contactSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 20,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

export const Contact = mongoose.model("contacts", contactSchema);
