import React from "react";
import logoImage from "../../../utils/images/tasking_logo.png";
import { ReactComponent as KakaoLogoImage } from "../../../utils/images/kakaotalk.svg";
import { faFacebook, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <main className="w-10/12 sm:w-10/12 md:w-4/6 lg:w-1/3 p-10 lg:p-20 rounded-lg border border-zinc-200  dark:bg-white">
        <form className="flex flex-col">
          <img src={logoImage} alt="task-ing logo" className="w-32 sm:w-32 md:w-48 lg:w-60 m-auto" />

          <h2 className="mt-6 sm:mt-6 md:mt-8 text-center text-zinc-800 text-sm sm:text-sm md:text-md lg:text-lg">
            Sign in to Task-ing.
          </h2>

          <label htmlFor="id" className="flex flex-col sm:flex-col mt-6 sm:mt-6 md:flex-row md:items-center md:mt-10">
            <span className="text-zinc-800 text-sm sm:text-sm md:text-md md:w-24">ID</span>
            <input
              type="text"
              placeholder="Input Your ID"
              id="id"
              className="mt-2 text-zinc-800 input input-bordered w-full max-w-sm bg-white hover:border-green-600 focus:border-green-900"
            />
          </label>

          <label htmlFor="password" className="flex flex-col sm:flex-col mt-6 md:flex-row md:items-center">
            <span className="text-zinc-800 text-sm sm:text-sm md:text-md md:w-24">password</span>
            <input
              type="password"
              placeholder="Input Your Password"
              id="password"
              className="mt-2 text-zinc-800 input input-bordered w-full max-w-sm bg-white hover:border-green-600 focus:border-green-900"
            />
          </label>

          <button className="mt-6 sm:mt-6 md:mt-8 btn text-white border-none bg-green-600 hover:bg-green-700 focus:bg-green-900">
            로그인
          </button>
          <div className="flex flex-col items-start md:flex-row md:justify-between md:items-center mt-2">
            <label className="label cursor-pointer justify-start">
              <input type="checkbox" className="checkbox checkbox-xs" />
              <span className="label-text ml-2 text-slate-400">Remember me</span>
            </label>
            <span className="text-sm text-slate-400">forgot ID or Password?</span>
          </div>
        </form>

        {/* 소셜 로그인 */}
        <div className="mt-6 sm:mt-6 md:mt-8 border-solid border-t border-t-zinc-300">
          <h3 className="mt-4 sm:mt-4 md:mt-6 text-center text-zinc-700 text-sm sm:text-sm md:text-md">
            다른 방식으로 로그인
          </h3>
          <div className="flex mt-3 sm:mt-3 md:mt-8 px-4 sm:px-4 justify-between sm:justify-between md:justify-center">
            <button className="py-2 px-3 rounded-lg bg-kakao-100 hover:bg-kakao-200 active:bg-kakao-100">
              <KakaoLogoImage width="16" height="16" fill="white" />
            </button>
            <button className="py-2 px-3 md:ml-4 rounded-lg bg-google-200 hover:bg-google-100 active:bg-google-200">
              <FontAwesomeIcon icon={faGoogle} color="white" />
            </button>
            <button className="py-2 px-3 md:ml-4 rounded-lg bg-github-200 hover:bg-github-100 active:bg-github-200">
              <FontAwesomeIcon icon={faGithub} color="white" />
            </button>
            <button className="py-2 px-3 md:ml-4 rounded-lg bg-facebook-200 hover:bg-facebook-100 active:bg-facebook-200">
              <FontAwesomeIcon icon={faFacebook} color="white" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
