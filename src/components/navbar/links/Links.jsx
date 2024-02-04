"use client";

import { HiOutlineBars3, HiXMark } from "react-icons/hi2";
import { linksList } from "@/components/navbar/links/links-list";
import NavLink from "@/components/navbar/links/navLink/NavLink";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Links = ({ session, handleLogout }) => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  function handleSidebarToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="gap-2 hidden lg:flex">
        {linksList.map((item) => (
          <NavLink item={item} key={item.title} />
        ))}{" "}
        {session ? (
          <>
            {session.user?.isAdmin && (
              <NavLink item={{ title: "Admin", path: "/admin" }} />
            )}
            <form action={handleLogout}>
              <button className="btn btn-neutral">Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>

      <div className="lg:hidden">
        <button
          onClick={handleSidebarToggle}
          className="btn btn-neutral btn-square text-lg"
        >
          <HiOutlineBars3 />
        </button>
        {isOpen && (
          <div className="fixed z-99 top-0 left-0 right-0 bottom-0">
            <div className="absolute -z-10 w-full h-full top-0 left-0 bg-black/50 pointer-events-none" />
            <div className="bg-primary relative gap-2 h-full w-64 flex flex-col ml-auto p-4">
              <button
                onClick={handleSidebarToggle}
                className="btn btn-neutral btn-square absolute top-4 left-4 text-lg self-start"
              >
                <HiXMark />
              </button>
              <div className="h-16" />
              {linksList.map((item) => (
                <NavLink item={item} key={item.title} />
              ))}{" "}
              {session ? (
                <>
                  {session.user?.isAdmin && (
                    <NavLink item={{ title: "Admin", path: "/admin/posts" }} />
                  )}
                  <form action={handleLogout}>
                    <button className="btn btn-neutral btn-block">
                      Logout
                    </button>
                  </form>
                </>
              ) : (
                <NavLink item={{ title: "Login", path: "/login" }} />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Links;
