"use client";
import { useUpdateUserContext } from "@/lib/updateUserContext";
import React from "react";

const EditPostButton = ({ userId }) => {
  const { setSelectedUserId } = useUpdateUserContext();

  const openUpdatePostModal = () => {
    setSelectedUserId(userId);
    const updateUserModal = document.getElementById("update-user-modal");
    updateUserModal.showModal();
  };
  return (
    <button
      type="button"
      onClick={openUpdatePostModal}
      className="btn btn-sm btn-neutral"
    >
      Edit
    </button>
  );
};

export default EditPostButton;
