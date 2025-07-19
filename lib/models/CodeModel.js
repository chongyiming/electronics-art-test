import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
});

const CodeModel = mongoose.models.code || mongoose.model("code", Schema);

export default CodeModel;
