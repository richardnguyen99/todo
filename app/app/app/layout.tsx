import * as React from "react";
import clsx from "classnames";

const AuthAppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div id="app_wrapper" className="w-full flex">
      <div
        className={clsx("flex", {
          "bg-indigo-50": true,
          "lg:w-[calc((100%_-_1024px)_/_2_-_8rem)]": true,
          "fixed top-12 left-0 bottom-0 z-50": true,
        })}
      >
        <div className="mt-12 mx-4 flex flex-col w-full">
          <ul className="flex flex-col">
            <li>Inbox</li>
            <li>Today</li>
            <li>Upcoming</li>
            <li>Filters & Labeling</li>
          </ul>
          <div className="mt-8 pt-8 border-t border-indigo-200">
            <h3>Add projects +</h3>
            <ul className="flex flex-col mt-2 ml-4">
              <li>Project 1</li>
              <li>Work</li>
              <li>School</li>
            </ul>
          </div>
          <div className="flex flex-col justify-end h-full my-6">
            <h1>Add workspace</h1>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[768px] lg:w-[1024px] mx-auto">
        <div className="mt-12">{children}</div>
      </div>
    </div>
  );
};

export default AuthAppLayout;
