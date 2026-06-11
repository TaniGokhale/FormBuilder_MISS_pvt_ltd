const mongoose = require("mongoose");

const fieldSchema =
  new mongoose.Schema({
    label: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "text",
        "number",
        "select",
      ],
      required: true,
    },

    required: {
      type: Boolean,
      default: false,
    },

    options: {
      type: [String],
      default: [],
    },
  });

const formSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
      },

      fields: [fieldSchema],
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Form",
    formSchema
  );