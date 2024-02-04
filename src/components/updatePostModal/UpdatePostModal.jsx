"use client";

import { useUpdatePostContext } from "@/lib/updatePostContext";
import React, { useCallback, useEffect, useState } from "react";
import FormCancelButton from "../formCancelButton/FormCancelButton";
import If from "../if/If";
import { useFormState } from "react-dom";

const UpdatePostModal = ({ updatePost }) => {
  const { selectedPostId } = useUpdatePostContext();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [loadingAuthors, setLoadingAuthors] = useState(true);
  const [state, formAction] = useFormState(updatePost, {});

  const formRef = React.useRef(null);
  const resetForm = useCallback(() => {
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [formRef]);

  const handleClose = useCallback(() => {
    resetForm();
    document.getElementById("update-post-modal").close();
  }, [resetForm]);

  useEffect(() => {
    if (selectedPostId) {
      const fetchAuthors = async () => {
        setLoadingAuthors(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setLoadingAuthors(false);
        setAuthors(data);
      };

      fetchAuthors();
    }
  }, [selectedPostId]);

  useEffect(() => {
    if (selectedPostId) {
      //fetch the post
      const fetchPost = async () => {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${selectedPostId}`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          setLoading(false);
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setPost(data);
        setLoading(false);
      };

      fetchPost();
    }
  }, [selectedPostId]);

  useEffect(() => {
    if (state?.success) {
      handleClose();
    }
  }, [state?.success, handleClose]);

  return (
    <dialog key={Math.random()} id="update-post-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center mb-4">Update Post</h3>
        <div>
          {loading ? (
            <div className="h-24 flex items-center justify-center">
              <span className="loading loading-infinity loading-lg"></span>
            </div>
          ) : (
            post && (
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
                    defaultValue={post.title}
                    className="input input-bordered w-full max-w-sm"
                  />
                </label>
                <label className="form-control w-full max-w-sm">
                  <input
                    type="text"
                    placeholder="Post Slug for URL"
                    name="slug"
                    defaultValue={post.slug}
                    className="input input-bordered w-full max-w-sm"
                  />
                </label>
                <select
                  name="author"
                  className="select select-bordered w-full max-w-sm"
                  defaultValue={loadingAuthors ? "loading" : post.userId}
                >
                  <option disabled value="Select the author">
                    Select The Author
                  </option>
                  <If
                    condition={!loadingAuthors}
                    otherwise={
                      <option disabled value="loading">
                        Loading...
                      </option>
                    }
                  >
                    {authors.map((author) => (
                      <option key={author._id} value={author._id}>
                        {author.username}
                      </option>
                    ))}
                  </If>
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
                    defaultValue={post.desc}
                  ></textarea>
                </label>
                <input type="hidden" name="id" value={post._id} />
                <div className="modal-action flex-1 gap-4">
                  <button className="btn btn-secondary" type="submit">
                    Submit
                  </button>
                  <FormCancelButton onClick={handleClose} />
                </div>
              </form>
            )
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default UpdatePostModal;
