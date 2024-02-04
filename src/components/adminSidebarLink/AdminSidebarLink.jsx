"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AdminSidebarLink = ({ item }) => {
  const pathName = usePathname();
  return (
    <Link
      className={`btn ${pathName === item.path ? "btn-neutral" : "btn-ghost"}`}
      href={item.path}
    >
      {item.title}
    </Link>
  );
};

export default AdminSidebarLink;
