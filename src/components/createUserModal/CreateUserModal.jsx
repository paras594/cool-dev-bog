"use client";
import React from "react";
import CreateUserForm from "./createUserForm/CreateUserForm";

const CreateUserModal = ({ addUser }) => {
  return (
    <>
      <button
        className="btn btn-outline btn-secondary"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Create User
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <CreateUserForm addUser={addUser} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default CreateUserModal;
