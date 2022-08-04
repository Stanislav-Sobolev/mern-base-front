const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  goal: { type: String, required: true },
  colorText: { type: String, required: true },
  colorBg: { type: String, required: true },
  transform: { type: Object, required: true },
  image: { type: String, required: true },
  status: { type: Boolean, required: true },
  code: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Goal", schema);
