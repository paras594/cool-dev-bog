"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ item }) => {
  const pathName = usePathname();

  return (
    <Link
      className={`btn ${
        pathName === item.path ? "btn-secondary" : "btn-ghost"
      }`}
      href={item.path}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;
