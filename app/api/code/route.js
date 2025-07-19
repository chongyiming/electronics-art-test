import { ConnectDB } from "@/lib/config/db";
import CodeModel from "@/lib/models/CodeModel";
import mongoose from "mongoose";

const { NextResponse } = require("next/server");
const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const existCode = await CodeModel.findOne({
    userId: new mongoose.Types.ObjectId(id),
  });
  if (existCode.code !== null) {
    return NextResponse.json({ success: true, msg: existCode });
  } else {
    return NextResponse.json({
      success: false,
      msg: "Code not found",
    });
  }
}
