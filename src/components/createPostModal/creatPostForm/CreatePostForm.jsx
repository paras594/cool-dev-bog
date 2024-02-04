"use client";
import { useFormState } from "react-dom";
import React, { useCallback, useEffect } from "react";
import FormCancelButton from "@/components/formCancelButton/FormCancelButton";

const CreatePostForm = ({ authors, addPost, userId }) => {
  const [state, formAction] = useFormState(addPost, {});

  const formRef = React.useRef(null);
  const resetForm = useCallback(() => {
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [formRef]);

  const handleClose = useCallback(() => {
    resetForm();
    document.getElementById("my_modal_1").close();
  }, [resetForm]);

  useEffect(() => {
    if (state?.success) {
      handleClose();
    }
  }, [state?.success, handleClose]);

  return (
    <div className="">
      <h1 className="text-lg font-semibold text-center mb-4">
        Write a New Post
      </h1>
      <form
        ref={formRef}
        action={formAction}
        className="flex flex-col items-center gap-4 py-4"
        id="create-post-form"
      >
        <label className="form-control w-full max-w-sm">
          <input
            type="text"
            placeholder="Post Title"
            name="title"
            className="input input-bordered w-full max-w-sm"
          />
        </label>
        <label className="form-control w-full max-w-sm">
          <input
            type="text"
            placeholder="Post Slug for URL"
            name="slug"
            className="input input-bordered w-full max-w-sm"
          />
        </label>
        <select
          name="author"
          className="select select-bordered w-full max-w-sm"
          defaultValue="Select the author"
        >
          <option disabled value="Select the author">
            Select The Author
          </option>
          {authors.map((author) => (
            <option key={author._id} value={author._id}>
              {author.username}
            </option>
          ))}
        </select>
        <label className="form-control w-full max-w-sm">
          <input
            type="file"
            name="img"
            className="file-input file-input-bordered w-full max-w-sm"
          />
        </label>
        <label className="form-control w-full max-w-sm">
          <textarea
            className="textarea textarea-bordered w-full max-w-sm resize-none h-48"
            name="desc"
            placeholder="Body"
          ></textarea>
        </label>
        <input type="hidden" name="userId" value={userId} />
        <div className="modal-action flex-1 gap-4">
          <button className="btn btn-secondary" type="submit">
            Submit
          </button>
          <FormCancelButton onClick={handleClose} />
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
