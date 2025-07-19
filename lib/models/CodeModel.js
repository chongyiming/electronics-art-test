import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const CodeModel = mongoose.models.code || mongoose.model("code", Schema);

export default CodeModel;
