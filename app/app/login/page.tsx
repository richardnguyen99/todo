import * as React from "react";
import clsx from "classnames";
import { NextPage } from "next";

import Form from "@components/form";

const LoginPage: NextPage = () => {
  return (
    <main>
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
          <div className="w-4/12">
            <h1 className="text-4xl font-bold mb-8">Login</h1>
            <Form.Login />
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
