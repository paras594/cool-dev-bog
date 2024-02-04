"use client";
import React from "react";
import Container from "@/components/container/Container";
import AdminSidebarLink from "@/components/adminSidebarLink/AdminSidebarLink";
import { UpdatePostContext } from "@/lib/updatePostContext";
import { UpdateUserContext } from "@/lib/updateUserContext";

const linksList = [
  {
    title: "Posts",
    path: "/admin/posts",
  },
  {
    title: "Users",
    path: "/admin/users",
  },
];

export default function AdminLayout({ children }) {
  const [selectedPostId, setSelectedPostId] = React.useState(null);
  const [selectedUserId, setSelectedUserId] = React.useState(null);

  return (
    <UpdatePostContext.Provider value={{ selectedPostId, setSelectedPostId }}>
      <UpdateUserContext.Provider value={{ selectedUserId, setSelectedUserId }}>
        <Container>
          <h1 className="text-2xl font-semibold mb-8 mt-4">Admin Panel</h1>
          <div className="flex flex-col lg:flex-row gap-8 h-full">
            <div className="w-60 lg:border-r flex flex-row lg:flex-col gap-4 pr-8 self-stretch">
              {linksList.map((item) => (
                <AdminSidebarLink key={item.title} item={item} />
              ))}
            </div>
            {children}
          </div>
        </Container>
      </UpdateUserContext.Provider>
    </UpdatePostContext.Provider>
  );
}
