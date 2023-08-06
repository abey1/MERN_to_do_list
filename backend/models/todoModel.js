const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoModel = new Schema(
  {
    item: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TodoModel", todoModel);
