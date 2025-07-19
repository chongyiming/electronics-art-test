import mongoose from "mongoose";

export const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://chongyiming:Amaci1205!@cluster0.zdxl7ya.mongodb.net/"
  );
  console.log("DB connected");
};
