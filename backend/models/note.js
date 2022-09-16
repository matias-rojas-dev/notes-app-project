const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: "Title is required",
    },
    content: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive"],
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    archived: {
      type: String,
      default: false,
      enum: [false, true]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
