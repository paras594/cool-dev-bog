"use client";
import CreatePostForm from "./creatPostForm/CreatePostForm";

const CreatePostModal = ({ authors, addPost, userId }) => {
  return (
    <>
      <button
        className="btn btn-outline btn-secondary"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Create Post
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <CreatePostForm authors={authors} addPost={addPost} userId={userId} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default CreatePostModal;
