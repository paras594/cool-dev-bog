import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import { connectToDb } from "./connectToDb";
import { Post, User } from "./models";
import bcrypt from "bcryptjs";
import cloudinary from "cloudinary";
import { fileObjToBase64 } from "./utils";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const sayHello = async () => {
  "use server"; // this makes this function a server function
  console.log("hello");
};

export const addPost = async (currentState, formData) => {
  "use server";
  const { title, desc, slug, userId, img, author } =
    Object.fromEntries(formData);
  console.log({ title, desc, slug, userId, img, author });
  /*
    img: File { ----> this is file type object received from client form
      size: 5242880,
      type: 'image/png',
      name: 'qrdufc6vsm25hp9vh9zx.png',
      lastModified: 1643498570000
    }
  */
  const imgData = await fileObjToBase64(img);

  const result = await cloudinary.v2.uploader.upload(imgData, {
    folder: "cool-dev-blogs",
  });

  /* result:
    {
      asset_id: '8a16d80b846d70252ecc2addaa348a2c',
      public_id: 'new-folder/qrdufc6vsm25hp9vh9zx',
      version: 1706359657,
      version_id: 'a10707094cae6c38d3c19b00e5536460',
      signature: 'defff720096d06abfd800abe244f9e575ddf2ee0',
      width: 1280,
      height: 720,
      format: 'png',
      resource_type: 'image',
      created_at: '2024-01-27T12:47:37Z',
      tags: [],
      bytes: 684461,
      type: 'upload',
      etag: '2b1b47a7b4b05fb57dbaa06cb80a78d2',
      placeholder: false,
      url: 'http://res.cloudinary.com/dzujgoodl/image/upload/v1706359657/new-folder/qrdufc6vsm25hp9vh9zx.png',
      secure_url: 'https://res.cloudinary.com/dzujgoodl/image/upload/v1706359657/new-folder/qrdufc6vsm25hp9vh9zx.png',
      folder: 'new-folder',
      api_key: '389634512669943'
    }
  */

  try {
    connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId: author,
      img: result.secure_url,
      imgId: result.public_id,
    });

    await newPost.save();
    revalidatePath("/blog");
    revalidatePath("/admin/posts");
    return { success: "Post created successfully" };
  } catch (error) {
    console.log({ error });

    if (error.code === 11000) {
      return { errors: { error: "Slug already exists" } };
    }

    return { errors: { error: "Something went wrong" } };
  }
};

export const updatePost = async (currentState, formData) => {
  "use server";
  const { id, title, desc, slug, img, author } = Object.fromEntries(formData);

  console.log({ id, title, desc, slug, img: img.size, author });

  try {
    await connectToDb();
    const post = await Post.findById(id);

    if (!post) {
      return { error: "Post not found" };
    }

    post.title = title;
    post.desc = desc;
    post.slug = slug;
    post.userId = author;

    if (img.size) {
      const imgData = await fileObjToBase64(img);

      const result = await cloudinary.v2.uploader.upload(imgData, {
        folder: "cool-dev-blogs",
      });

      post.img = result.secure_url;
      post.imgId = result.public_id;
    }
    await post.save();
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/blog");
    revalidatePath("/admin/posts");

    return {
      success: "Post updated successfully",
      post: {
        id: post._id,
        title: post.title,
        desc: post.desc,
        slug: post.slug,
        img: post.img,
        userId: post.userId,
        imgId: post.imgId,
      },
    };
  } catch (error) {
    console.log({ error });

    if (error.code === 11000) {
      return { errors: { error: "Slug already exists" } };
    }
    return { errors: { error: "Something went wrong during the update" } };
  }
};

export const deletePost = async (formData) => {
  "use server";

  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();
    await Post.findByIdAndDelete(id);
    revalidatePath("/admin");
    revalidatePath("/blog/posts");
    return { success: "Post deleted successfully" };
  } catch (error) {
    console.log({ error });
    return { errors: { error: "Something went wrong" } };
  }
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const registerUser = async (currentState, formData) => {
  "use server";

  const { username, email, password, confirmPassword } =
    Object.fromEntries(formData);

  if (password !== confirmPassword) {
    return {
      errors: {
        confirmPassword: "Passwords do not match",
      },
    };
  }

  if (password.length < 5) {
    return {
      errors: {
        password: "Password must be at least 5 characters",
      },
    };
  }

  try {
    connectToDb();
    const user = await User.findOne({ username });

    if (user) {
      return {
        errors: {
          username: "User already exists",
        },
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return { success: true };
  } catch (error) {
    console.log({ error });
    return {
      errors: {
        error: "Something went wrong",
      },
    };
  }
};

export const loginUser = async (currentState, formData) => {
  "use server";
  const { username, password } = Object.fromEntries(formData);

  try {
    connectToDb();
    const user = await User.findOne({ username });

    if (!user) {
      return { errors: { username: "User not found" } };
    }

    await signIn("credentials", {
      username,
      password,
    });

    return { success: true };
  } catch (error) {
    if (error.type === "CredentialsSignin") {
      return { errors: { error: "Invalid username or password" } };
    }

    console.log({ error });
    throw error;
  }
};

export const addUser = async (currentState, formData) => {
  "use server";
  const { username, email, password, confirmPassword, img, isAdmin } =
    Object.fromEntries(formData);

  console.log({ username, email, password, confirmPassword, img, isAdmin });

  if (password !== confirmPassword) {
    return {
      errors: {
        confirmPassword: "Passwords do not match",
      },
    };
  }

  if (password.length < 5) {
    return {
      errors: {
        password: "Password must be at least 5 characters",
      },
    };
  }

  try {
    connectToDb();
    const newUser = await User({
      username,
      email,
      isAdmin: isAdmin === "on",
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    newUser.password = hashedPassword;

    if (img) {
      const imgData = await fileObjToBase64(img);
      const result = await cloudinary.v2.uploader.upload(imgData, {
        folder: "cool-dev-user-profile-pictures",
      });
      newUser.img = result.secure_url;
      newUser.imgId = result.public_id;
    }

    await newUser.save();
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.log({ error });
    if (error.code === 11000) {
      return { errors: { username: "Username already exists" } };
    }
    return { errors: { error: "Something went wrong" } };
  }
};

export const updateUser = async (currentState, formData) => {
  "use server";
  const { id, username, email, password, confirmPassword, img, isAdmin } =
    Object.fromEntries(formData);
  console.log({ id, username, email, password, confirmPassword, img });

  try {
    connectToDb();
    const user = await User.findById(id);

    if (!user) {
      return { errors: { error: "User not found" } };
    }

    user.username = username;
    user.email = email;
    user.isAdmin = isAdmin === "on";

    if (password) {
      if (password !== confirmPassword) {
        return {
          errors: {
            confirmPassword: "Passwords do not match",
          },
        };
      }

      if (password.length < 5) {
        return {
          errors: {
            password: "Password must be at least 5 characters",
          },
        };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user.password = hashedPassword;
    }

    if (img.size) {
      const imgData = await fileObjToBase64(img);
      const result = await cloudinary.v2.uploader.upload(imgData, {
        folder: "cool-dev-user-profile-pictures",
      });
      user.img = result.secure_url;
      user.imgId = result.public_id;
    }

    await user.save();
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.log({ error });
    return { errors: { error: "Something went wrong" } };
  }
};

export const deleteUser = async (formData) => {
  "use server";
  const { id, sessionUserId } = Object.fromEntries(formData);

  if (id === sessionUserId) {
    return { errors: { error: "You cannot delete yourself" } };
  }

  try {
    connectToDb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);

    revalidatePath("/admin/users");
    return { success: "User deleted successfully" };
  } catch (error) {
    console.log({ error });
    return { errors: { error: "Something went wrong" } };
  }
};
