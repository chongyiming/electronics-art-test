import { ConnectDB } from "@/lib/config/db";
import CodeModel from "@/lib/models/CodeModel";

const { NextResponse } = require("next/server");
const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function GET(request) {
  const existCode = await CodeModel.findOne({});
  console.log(existCode);
  if (existCode.code !== null) {
    return NextResponse.json({ success: true, msg: existCode });
  } else {
    return NextResponse.json({
      success: false,
      msg: "Code not found",
    });
  }
}
