"use client";

import React, { useCallback, useEffect, useState } from "react";
import FormCancelButton from "../formCancelButton/FormCancelButton";
import If from "../if/If";
import { useFormState } from "react-dom";
import { useUpdateUserContext } from "@/lib/updateUserContext";
import InputErrorLabel from "../inputErrorLabel/InputErrorLabel";

const UpdateUserModal = ({ updateUser }) => {
  const { selectedUserId } = useUpdateUserContext();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, formAction] = useFormState(updateUser, {});

  const formRef = React.useRef(null);
  const resetForm = useCallback(() => {
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [formRef]);

  const handleClose = useCallback(() => {
    resetForm();
    document.getElementById("update-user-modal").close();
  }, [resetForm]);

  useEffect(() => {
    if (selectedUserId) {
      const fetchUser = async () => {
        setLoading(true);
        const res = await fetch(
          `http://localhost:3000/api/users/${selectedUserId}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setLoading(false);
        setUser(data);
      };
      fetchUser();
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (state?.success) {
      handleClose();
    }
  }, [state?.success, handleClose]);

  console.log({ state });

  return (
    <dialog id="update-user-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center mb-4">
          Update User {selectedUserId}
        </h3>
        <div>
          {loading ? (
            <div className="h-24 flex items-center justify-center">
              <span className="loading loading-infinity loading-lg"></span>
            </div>
          ) : (
            user && (
              <form
                ref={formRef}
                action={formAction}
                className="flex flex-col items-center gap-4 py-4"
                id="update-user-form"
              >
                <label className="form-control w-full max-w-sm">
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    defaultValue={user.username}
                    className="input input-bordered w-full max-w-sm"
                  />
                  {state?.errors?.username && (
                    <InputErrorLabel errorMsg={state.errors.username} />
                  )}
                </label>
                <label className="form-control w-full max-w-sm">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    defaultValue={user.email}
                    className="input input-bordered w-full max-w-sm"
                  />
                  {state?.errors?.email && (
                    <InputErrorLabel errorMsg={state.errors.email} />
                  )}
                </label>
                <label className="form-control w-full max-w-sm">
                  <input
                    type="file"
                    name="img"
                    className="file-input file-input-bordered w-full max-w-sm"
                  />
                  {state?.errors?.img && (
                    <InputErrorLabel errorMsg={state.errors.img} />
                  )}
                </label>
                <label className="form-control w-full max-w-sm">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input input-bordered w-full max-w-sm"
                  />
                  {state?.errors?.password && (
                    <InputErrorLabel errorMsg={state.errors.password} />
                  )}
                </label>
                <label className="form-control w-full max-w-sm">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="input input-bordered w-full max-w-sm"
                  />
                  {state?.errors?.confirmPassword && (
                    <InputErrorLabel errorMsg={state.errors.confirmPassword} />
                  )}
                </label>
                <div className="form-control w-full max-w-sm">
                  <label className="label cursor-pointer flex justify-start">
                    <span className="text-lg font-semibold mr-8">
                      Is Admin ?
                    </span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-secondary"
                      defaultChecked={user.isAdmin}
                      name="isAdmin"
                    />
                  </label>
                </div>
                <input type="hidden" name="id" defaultValue={user._id} />
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

export default UpdateUserModal;
