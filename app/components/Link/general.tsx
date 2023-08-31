import * as React from "react";
import clsx from "classnames";
import Link, { LinkProps } from "next/link";

type Props = React.PropsWithChildren<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps
>;

const GeneralLink: React.FC<Props> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className={clsx("relative block w-fit", {
        "bg-transparent": true,
        "hover:bg-gradient-70": true,
        "from-blue-500 to-cyan-400": true,
        "bg-clip-text": true,
        "hover:text-transparent": true,
        "after:absolute after:content-['']": true,
        "after:bottom-0 after:left-0": true,
        "after:h-[2px] after:w-0": true,
        "hover:after:w-full": true,
        "after:bg-gradient-70": true,
        "after:from-blue-500 after:to-cyan-400": true,
        "after:bg-clip-content": true,
        "after:transition-[width]": true,
        "after:duration-300 after:ease-in-out": true,
      })}
    >
      {children}
    </Link>
  );
};

export default GeneralLink;
