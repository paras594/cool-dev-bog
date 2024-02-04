import Container from "@/components/container/Container";
import { addPost, sayHello } from "@/lib/action";

const ServerActionTestPage = () => {
  // const actionInComponent = async () => {
  //   "use server"; // makes this function a server action
  //   console.log("hello");
  // };

  return (
    <Container>
      <h1 className="text-lg font-semibold mb-4">Add Post</h1>
      <form className="flex flex-col gap-4 max-w-xs" action={addPost}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          name="desc"
          placeholder="Description"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          className="input input-bordered w-full max-w-xs"
        />
        <button className="btn btn-secondary" type="submit">
          Submit
        </button>
      </form>
    </Container>
  );
};

export default ServerActionTestPage;
