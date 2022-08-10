import React from "react";
import { useState } from "react";
import logoImage from "../../../utils/assets/tasking_logo.png";

const RegisterPage = () => {
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onIdChangeHandler = (event) => {
    setId(event.currentTarget.value);
  };

  const onNicknameChangeHandler = (event) => {
    setNickname(event.currentTarget.value);
  };

  const onEmailChangeHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordChangeHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <main className="w-10/12 sm:w-10/12 md:w-4/6 lg:w-1/3 p-10 lg:p-20 rounded-lg border border-zinc-200  dark:bg-white">
        {/* 회원가입 form */}
        <form onSubmit={onSubmitHandler} className="flex flex-col">
          <img src={logoImage} alt="task-ing logo" className="w-32 sm:w-32 md:w-48 lg:w-60 m-auto" />

          <h2 className="mt-6 sm:mt-6 md:mt-8 text-center text-zinc-800 text-sm sm:text-sm md:text-md lg:text-lg">
            Sign Up to Task-ing.
          </h2>

          <label htmlFor="id" className="flex flex-col sm:flex-col mt-6 sm:mt-6 md:flex-row md:items-center md:mt-10">
            <span className="text-zinc-800 text-sm sm:text-sm md:text-md md:w-24">ID</span>
            <input
              type="text"
              placeholder="Input Your ID"
              value={id}
              onChange={onIdChangeHandler}
              id="id"
              className="mt-2 text-zinc-800 input input-bordered w-full max-w-sm bg-white hover:border-green-600 focus:border-green-900"
            />
          </label>

          <label
            htmlFor="nickname"
            className="flex flex-col sm:flex-col mt-6 sm:mt-6 md:flex-row md:items-center md:mt-10"
          >
            <span className="text-zinc-800 text-sm sm:text-sm md:text-md md:w-24">ID</span>
            <input
              type="text"
              placeholder="Input Your ID"
              value={nickname}
              onChange={onNicknameChangeHandler}
              id="nickname"
              className="mt-2 text-zinc-800 input input-bordered w-full max-w-sm bg-white hover:border-green-600 focus:border-green-900"
            />
          </label>

          <label
            htmlFor="email"
            className="flex flex-col sm:flex-col mt-6 sm:mt-6 md:flex-row md:items-center md:mt-10"
          >
            <span className="text-zinc-800 text-sm sm:text-sm md:text-md md:w-24">Email</span>
            <input
              type="text"
              placeholder="Input Your ID"
              value={email}
              onChange={onEmailChangeHandler}
              id="email"
              className="mt-2 text-zinc-800 input input-bordered w-full max-w-sm bg-white hover:border-green-600 focus:border-green-900"
            />
          </label>

          <label htmlFor="password" className="flex flex-col sm:flex-col mt-6 md:flex-row md:items-center">
            <span className="text-zinc-800 text-sm sm:text-sm md:text-md md:w-24">password</span>
            <input
              type="password"
              placeholder="Input Your Password"
              value={password}
              onChange={onPasswordChangeHandler}
              id="password"
              className="mt-2 text-zinc-800 input input-bordered w-full max-w-sm bg-white hover:border-green-600 focus:border-green-900"
            />
          </label>

          <button
            type="submit"
            className="mt-6 sm:mt-6 md:mt-8 btn text-white border-none bg-green-600 hover:bg-green-700 focus:bg-green-900"
          >
            회원가입
          </button>
        </form>
      </main>
    </div>
  );
};

export default RegisterPage;
