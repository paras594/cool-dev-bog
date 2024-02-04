"use client";

import { useFormState } from "react-dom";
import React, { useCallback, useEffect } from "react";
import FormCancelButton from "@/components/formCancelButton/FormCancelButton";
import InputErrorLabel from "@/components/inputErrorLabel/InputErrorLabel";

const CreateUserForm = ({ addUser }) => {
  const [state, formAction] = useFormState(addUser, {});

  const formRef = React.useRef(null);
  const resetForm = useCallback(() => {
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [formRef]);

  const handleClose = useCallback(() => {
    resetForm();
    document.getElementById("my_modal_2").close();
  }, [resetForm]);

  useEffect(() => {
    if (state?.success) {
      handleClose();
    }
  }, [state?.success, handleClose]);

  return (
    <div className="">
      <h1 className="text-lg font-semibold text-center mb-4">
        Create a New User
      </h1>
      <form
        ref={formRef}
        action={formAction}
        className="flex flex-col items-center gap-4 py-4"
        id="create-user-form"
      >
        <label className="form-control w-full max-w-sm">
          <input
            type="text"
            placeholder="Username"
            name="username"
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
            <span className="text-lg font-semibold mr-8">Is Admin ?</span>
            <input
              type="checkbox"
              className="checkbox checkbox-secondary"
              name="isAdmin"
            />
          </label>
        </div>
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

export default CreateUserForm;
