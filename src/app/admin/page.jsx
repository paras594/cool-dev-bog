import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin ",
  description: "Admin panel for managing posts and users.",
};

const AdminPage = () => {
  redirect("/admin/posts");
};

export default AdminPage;
