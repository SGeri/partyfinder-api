import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.headers?.authorization?.split(" ")[1];

  if (token !== process.env.ADMIN_TOKEN) {
    return new Response(
      JSON.stringify({
        error: "Hitelesítési token megadása kötelező.",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return NextResponse.next();
}
