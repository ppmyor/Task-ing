import React from "react";
import logoImage from "../../../utils/assets/tasking_logo.png";
import { ReactComponent as NaverLogoImage } from "../../../utils/assets/naver.svg";
import { ReactComponent as KakaoLogoImage } from "../../../utils/assets/kakaotalk.svg";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleLogin from "react-google-login";
import { GOOGLE_CLIENT_ID, KAKAO_AUTH_URL, NAVER_AUTH_URL, GITHUB_AUTH_URL } from "../../../config/OAuth";
import { gapi } from "gapi-script";
import axios from "axios";
import { DOMAIN } from "../../../config/domain";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({ mode: "onChange" });

  const onSubmitHandler = (data) => {
    console.log(data.email, data.password);
  };

  // kakao login handler
  const kakaoLoginHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  // naver login handler
  const naverLoginHandler = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  //  github login handler
  const githubLoginHandler = () => {
    window.location.href = GITHUB_AUTH_URL;
  };

  // google login Success
  const onGoogleSuccess = async (res) => {
    console.log(res);
    let body = {
      access_token: res.accessToken,
      id_token: res.tokenId,
    };

    await axios
      .post(`${DOMAIN}/accounts/rest-auth/google/`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("accessToken", response.data.access_token);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  // google login Failure
  const onGoogleFailure = (res) => {
    window.alert("구글 로그인에 실패하였습니다.");
    console.log("error", res);
  };

  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId: `${GOOGLE_CLIENT_ID}.apps.googleusercontent.com`,
      plugin_name: "chat",
    });
  });

  return (
    <div className="center-display">
      <main className="main-card">
        {/* 로그인 form */}
        <form onSubmit={handleSubmit((data) => onSubmitHandler(data))} className="flex flex-col">
          <img src={logoImage} alt="task-ing logo" className="w-32 sm:w-32 md:w-48 lg:w-60 m-auto" />

          <h2 className="notice-text">Sign in to Task-ing.</h2>

          <label htmlFor="email" className="account-label md:mt-10">
            <span className="account-label-text">Email</span>
            <input
              type="email"
              placeholder="Input Your E-mail"
              id="email"
              className="account-input"
              aria-invalid={!isDirty ? undefined : errors.email ? "true" : "false"}
              {...register("email", {
                required: "이메일은 필수 입력입니다.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "이메일의 형식과 일치하지 않습니다.",
                },
              })}
            />
          </label>
          {errors.email && (
            <span role="alert" className="validation-alert-text">
              {errors.email.message}
            </span>
          )}

          <label htmlFor="password" className="account-label">
            <span className="account-label-text">password</span>
            <input
              type="password"
              placeholder="Input Your Password"
              id="password"
              className="account-input"
              aria-invalid={!isDirty ? undefined : errors.password ? "true" : "false"}
              {...register("password", {
                required: "비밀번호는 필수 입력입니다.",
                minLength: {
                  value: 8,
                  message: "한 개 이상의 영문자, 한 개 이상의 숫자를 포함한 8자리 이상의 비밀번호를 입력하세요.",
                },
                pattern: {
                  value: /^[a-zA-Z0-9]*$/,
                  message: "비밀번호의 형식과 일치하지 않습니다.",
                },
              })}
            />
          </label>
          {errors.password && (
            <span role="alert" className="validation-alert-text">
              {errors.password.message}
            </span>
          )}

          <button type="submit" className="btn-green" disabled={isSubmitting}>
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
            {/* kakao */}
            <button className="social-login-btn md:ml-0 kakao-btn" onClick={kakaoLoginHandler}>
              <KakaoLogoImage width="16" height="16" fill="white" />
            </button>

            {/* google */}
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              onSuccess={onGoogleSuccess}
              onFailure={onGoogleFailure}
              buttonText=""
              render={(renderProps) => (
                <button onClick={renderProps.onClick} className="social-login-btn google-btn">
                  <FontAwesomeIcon icon={faGoogle} color="white" />
                </button>
              )}
            />

            {/* github */}
            <button onClick={githubLoginHandler} className="social-login-btn github-btn">
              <FontAwesomeIcon icon={faGithub} color="white" />
            </button>

            {/* naver */}
            <button className="social-login-btn naver-btn" onClick={naverLoginHandler}>
              <NaverLogoImage width="18" height="18" fill="#00B900" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
