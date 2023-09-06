"use client";
// Session Context Provider that wraps the entire app and provides the session
// if a user is logged in.

import * as React from "react";
import { usePathname } from "next/navigation";

export const SessionContext = React.createContext({});

export const SessionProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const pathname = usePathname();
  const [session, setSession] = React.useState(null);

  const value = React.useMemo(() => ({ session, setSession }), [session]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(process.env.NEXT_PUBLIC_API_GATEWAY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `#graphql
            query GetUser {
              getUser {
                id
                name
                email
              }
            }
          `,
        }),
        credentials: "include",
      });

      const { data: user } = await data.json();
      console.log(user);

      setSession(user);
    };

    fetchData().catch((error) => {
      console.log(error);
    });
  }, [pathname]);

  return (
    <SessionContext.Provider value={{ value }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const session = React.useContext(SessionContext);

  if (!session) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return session;
};

export default SessionProvider;
