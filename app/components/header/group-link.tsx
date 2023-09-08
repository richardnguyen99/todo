"use client";

import * as React from "react";
import { useSession } from "next-auth/react";

import HeaderLink from "./link";

const GroupLink: React.FC = () => {
  const { data, status } = useSession();

  React.useEffect(() => {}, [status, data]);

  if (status === "loading") return <></>;

  return (
    <>
      {!data?.user && (
        <>
          <HeaderLink href="/login">Login</HeaderLink>
          <HeaderLink href="/register">Register</HeaderLink>
        </>
      )}

      {data?.user && (
        <>
          <HeaderLink href="#">Profiles</HeaderLink>
          <HeaderLink href="#">Logout</HeaderLink>
        </>
      )}
    </>
  );
};

export default GroupLink;
