import { login } from "@/lib/puppeteer";
import { parseStudentName } from "@/utils/utils";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  // try {
  //   const { data } = await query(
  //     "SELECT * FROM blogs ORDER BY updated_at DESC"
  //   );
  //   return NextResponse.json({ status: true, data });
  // } catch (err) {
  //   console.error("Failed while fetching blog:", err);
  //   return NextResponse.json({ status: false, message: err.message });
  // }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const data = await login(body);
    const user = parseStudentName(data?.studentName || "");
    const success = !!user?.name;
    if (success) {
      cookies().set("user", JSON.stringify(user), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
    }
    return NextResponse.json(
      {
        status: success,
        message: success ? "Login success" : "Invalid username or password",
        user,
      },
      { status: success ? 200 : 404 }
    );
  } catch (err) {
    return NextResponse.json(
      { status: false, message: err.message },
      { status: 500 }
    );
  }
}
