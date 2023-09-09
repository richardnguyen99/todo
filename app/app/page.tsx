import * as React from "react";
import clsx from "classnames";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Form from "@components/form";
import authOptions from "@lib/auth";
import Header from "@components/header";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (session && session.user) {
    return redirect("/app");
  }

  return (
    <>
      <div id="appLanding" className="mt-16">
        <section
          className={clsx("", {
            "w-full h-screen": true,
          })}
        >
          <div
            className={clsx("", {
              "flex items-center justify-center h-full": true,
              "w-full md:w-[768px] lg:w-[1024px] mx-auto": true,
            })}
          >
            <div className="w-8/12">
              <h1 className="text-[150px] font-black leading-none">
                -TODO APP
              </h1>
              <h3 className="text-lg italic text-neutral-700">
                An experimental task tracking application
              </h3>
            </div>

            <div className="w-4/12">
              <div className="flex flex-col gap-12">
                <h1 className="text-3xl font-bold">Login</h1>
                <div>
                  <Form.Login />

                  {/* Register if don't have account */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <hr className="w-full" />
                      <span className="px-2 text-sm text-gray-500">or</span>
                      <hr className="w-full" />
                    </div>
                    <div className="mt-4">
                      <Link
                        href="/register"
                        className={clsx(
                          "inline-block text-sm font-bold  align-baseline",
                          {
                            "rounded-lg px-4 py-2": true,
                            "bg-transparent hover:bg-sky-500/25": true,
                            "text-blue-500 hover:text-sky-700": true,
                          }
                        )}
                      >
                        Register a new account
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
