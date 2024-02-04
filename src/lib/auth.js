import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { connectToDb } from "./connectToDb";
import { User } from "./models";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
  try {
    connectToDb();

    console.log({ credentials });

    const user = await User.findOne({ username: credentials.username });

    if (!user) {
      throw new Error("Wrong credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Wrong credentials");
    }

    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      img: user.img,
      isAdmin: user.isAdmin,
      imgId: user.imgId,
    };
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to login");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github") {
        connectToDb();

        try {
          const user = await User.findOne({ email: profile.email });

          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              image: profile.avatar_url,
            });

            await newUser.save();
          }

          return true;
        } catch (error) {
          console.log({ error });
          return false; // if we return false here, if user is not in our db, user will not be authenticated
        }
      }

      if (account.provider === "credentials") {
        return true;
      }
    },
    ...authConfig.callbacks,
  },
});
