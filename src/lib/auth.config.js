import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }

      return session;
    },
    authorized({ auth, request }) {
      // console.log({ auth }); // it includes our session object

      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

      // only admin can reach the admin dashboard
      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }

      // only authenticated users can reach the blog page
      if (isOnBlogPage && !user) {
        return false;
      }

      // only unauthenticated users can reach the login page
      if (isOnLoginPage && user) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
