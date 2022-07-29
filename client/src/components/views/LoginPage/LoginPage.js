import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(Id, Password);

    let body = {
      id: Id,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate("/");
      } else {
        alert("Error");
      }
    });
  };

  return (
    <div class="flex justify-center items-center w-full h-screen">
      <form class="flex flex-col w-72" onSubmit={onSubmitHandler}>
        <div>
          <label>
            <span class="text-sm font-medium text-slate-700">ID</span>
            <input
              type="text"
              value={Id}
              onChange={onIdHandler}
              class="mt-1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </label>
        </div>
        <div>
          <label>
            <span class="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              value={Password}
              onChange={onPasswordHandler}
              class="mt-1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </label>
        </div>
        <button
          type="submit"
          class="mt-2 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-600 hover:bg-green-800"
        >
          확인
        </button>

        <button class="mt-8 py-2 px-4 font-semibold rounded-lg shadow-md text-slate-700 bg-slate-50 hover:bg-blue-500 hover:text-white">
          google 로그인
        </button>
        <button class="mt-2 py-2 px-4 font-semibold rounded-lg shadow-md text-slate-700 bg-slate-50 hover:bg-slate-800 hover:text-white">
          GitHub 로그인
        </button>
        <button class="mt-2 py-2 px-4 font-semibold rounded-lg shadow-md text-slate-700 bg-slate-50 hover:bg-blue-900 hover:text-white">
          facebook 로그인
        </button>
        <button class="mt-2 py-2 px-4 font-semibold rounded-lg shadow-md text-slate-700 bg-slate-50 hover:bg-yellow-300 ">
          kakao 로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
