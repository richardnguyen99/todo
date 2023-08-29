import * as React from "react";
import clsx from "classnames";
import Image from "next/image";

const Home: React.FC = () => {
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
          <div className="w-8/12">
            <h1 className="text-[150px] font-black leading-none">-TODO APP</h1>
            <h3 className="text-lg italic text-neutral-700">
              An experimental task tracking application
            </h3>
          </div>
          <div className="w-4/12">
            <h1>Login</h1>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
