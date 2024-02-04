"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import InputErrorLabel from "../inputErrorLabel/InputErrorLabel";

const LoginForm = ({ loginUser }) => {
  const [state, formAction] = useFormState(loginUser, {});
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/");
    }
  }, [state?.success, router]);

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full max-w-sm">
      <div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="input input-bordered w-full"
        />
        {state?.errors?.username && (
          <InputErrorLabel errorMsg={state.errors.username} />
        )}
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full"
        />
        {state?.errors?.password && (
          <InputErrorLabel errorMsg={state.errors.password} />
        )}
      </div>
      <button className="btn btn-secondary">Login with credentials</button>
      {state?.errors?.error && (
        <div role="alert" className="alert bg-red-100 border border-red-200">
          <HiOutlineExclamationTriangle className="text-xl" />
          <span>{state.errors.error}</span>
        </div>
      )}
      <div className="text-center">
        Don&apos;t have an account?{" "}
        <Link className="link" href="/register">
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
