import { connectToDb } from "./connectToDb";
import { Post, User } from "./models";
import { faker } from "@faker-js/faker";
import { unstable_noStore as noStore } from "next/cache";

export const getPosts = async () => {
  try {
    connectToDb();
    const posts = await Post.find();
    return posts;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts");
  }
};

export const getPost = async (slug) => {
  noStore(); // this is to disable cache just like we do when using fetch api
  try {
    connectToDb();
    const post = await Post.findOne({ slug });
    return post;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch post");
  }
};

export const getUser = async (id) => {
  try {
    connectToDb();
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user");
  }
};

export const getUsers = async () => {
  try {
    connectToDb();
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users");
  }
};

// generate some posts and users for development:
export const generateData = async () => {
  console.log("genrating data");
  try {
    await connectToDb();
    const users = await User.find();

    const posts = [];
    const createPostForUsers = async () => {
      for (let i = 0; i < 6; i++) {
        const postTitle = faker.lorem.sentence();
        posts.push({
          title: postTitle,
          desc: faker.lorem.paragraph(),
          img: faker.image.urlPicsumPhotos(),
          userId: users[Math.floor(Math.random() * users.length)]._id,
          slug: faker.helpers.slugify(postTitle),
        });
      }
    };

    createPostForUsers();

    await Post.insertMany(posts);
    console.log("Data generated!");
  } catch (error) {
    console.log(error);
  }
};
