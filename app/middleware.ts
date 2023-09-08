import { NextMiddleware, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

const middleware: NextMiddleware = async (req) => {
  const response = NextResponse.next();

  console.log(response);

  return response;
};

export default withAuth(middleware);

export const config = {
  matcher: "/app",
};
