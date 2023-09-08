import * as React from "react";
import { getServerSession } from "next-auth";

import auth from "@lib/auth";
import HeaderLink from "./link";

const GroupLink: React.FC = async () => {
  const session = await getServerSession(auth);

  return session?.user ? (
    <>
      <HeaderLink href="#">Profiles</HeaderLink>
      <HeaderLink href="#">Logout</HeaderLink>
    </>
  ) : (
    <>
      <HeaderLink href="/login">Login</HeaderLink>
      <HeaderLink href="/register">Register</HeaderLink>
    </>
  );
};

export default GroupLink;
