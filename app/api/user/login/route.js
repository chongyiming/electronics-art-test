import { ConnectDB } from "@/lib/config/db";
import UserModel from "@/lib/models/UserModel";
import bcrypt from "bcryptjs";
import CodeModel from "@/lib/models/CodeModel";
import mongoose from "mongoose";

const { NextResponse } = require("next/server");
const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function POST(request) {
  const formData = await request.formData();

  const userData = {
    email: `${formData.get("email")}`,
    password: `${formData.get("password")}`,
  };

  const existEmail = await UserModel.find({ email: userData.email });
  if (existEmail.length > 0) {
    const isPasswordValid = await bcrypt.compare(
      userData.password,
      existEmail[0].password
    );
    if (isPasswordValid) {
      const existCode = await CodeModel.findOneAndUpdate(
        { userId: new mongoose.Types.ObjectId(existEmail[0]._id) },
        { code: "000000" },
        { upsert: true }
      );

      return NextResponse.json({ success: true, msg: existEmail });
    } else {
      return NextResponse.json({
        success: false,
        msg: "Password is not correct",
      });
    }
  } else {
    return NextResponse.json({
      success: false,
      msg: "User is not sign up yet",
    });
  }
}
