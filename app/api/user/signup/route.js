import { ConnectDB } from "@/lib/config/db";
import UserModel from "@/lib/models/UserModel";
import bcrypt from "bcryptjs";

const { NextResponse } = require("next/server");
const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function POST(request) {
  const formData = await request.formData();

  const userData = {
    email: `${formData.get("email")}`,
    password: await bcrypt.hash(`${formData.get("password")}`, 10),
  };

  const existEmail = await UserModel.find({ email: userData.email });
  if (existEmail.length > 0) {
    return NextResponse.json({ success: false, msg: "User already exist" });
  } else {
    await UserModel.create(userData);
    return NextResponse.json({ success: true, msg: "User added" });
  }
}
