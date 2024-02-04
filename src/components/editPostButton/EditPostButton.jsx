"use client";
import { useUpdatePostContext } from "@/lib/updatePostContext";
import React from "react";

const EditPostButton = ({ postId }) => {
  const { setSelectedPostId } = useUpdatePostContext();

  const openUpdatePostModal = () => {
    setSelectedPostId(postId);
    const updatePostModal = document.getElementById("update-post-modal");
    updatePostModal.showModal();
  };
  return (
    <button onClick={openUpdatePostModal} className="btn btn-sm btn-neutral">
      Edit
    </button>
  );
};

export default EditPostButton;
