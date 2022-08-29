import React from "react";
import logoImage from "../../../utils/assets/tasking_logo.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();

  const onValid = (data) => {
    console.log("회원가입 성공");
    // !! 회원가입 api 호출 !!
    navigate("/");
    console.log(data);
  };

  return (
    // 아이디, 비밀번호, 비밀번호 확인, 닉네임, 이메일, 직업 옵션
    <div className="center-display">
      <main className="main-card">
        <img src={logoImage} alt="task-ing logo" className="w-32 sm:w-32 md:w-48 lg:w-60 m-auto" />

        {/* 회원가입 form */}
        <form action="POST" onSubmit={handleSubmit(onValid)} className="flex flex-col">
          <h2 className="notice-text">Sign up to Task-ing. :)</h2>

          <label htmlFor="email" className="account-label">
            <span className="account-label-text">E-mail</span>
            <input
              type="email"
              placeholder="Input Your email"
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
          {/* email 관련 error message */}
          {errors.email && (
            <span role="alert" className="validation-alert-text">
              {errors.email.message}
            </span>
          )}

          <label htmlFor="nickname" className="account-label">
            <span className="account-label-text">nickname</span>
            <input
              type="text"
              placeholder="Input Your nickname"
              id="nickname"
              className="account-input"
              aria-invalid={!isDirty ? undefined : errors.nickname ? "true" : "false"}
              {...register("nickname", {
                required: "닉네임은 필수 입력입니다.",
              })}
            />
          </label>
          {/* nickname 관련 error message */}
          {errors.nickname && (
            <span role="alert" className="validation-alert-text">
              {errors.nickname.message}
            </span>
          )}

          <label htmlFor="password" className="account-label">
            <span className="account-label-text">password</span>
            <input
              type="password"
              id="password"
              placeholder="Input Your password"
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
          {/* 비밀번호 관련 error message */}
          {errors.password && (
            <span role="alert" className="validation-alert-text">
              {errors.password.message}
            </span>
          )}
          <label htmlFor="confirm-password" className="account-label">
            <span className="account-label-text">confirm password</span>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm Your password"
              className="account-input"
              aria-invalid={!isDirty ? undefined : errors.passwordConfirm ? "true" : "false"}
              {...register("passwordConfirm", {
                required: "비밀번호는 필수 입력입니다.",
                minLength: {
                  value: 8,
                  message: "한 개 이상의 영문자, 한 개 이상의 숫자를 포함한 8자리 이상의 비밀번호를 입력하세요.",
                },
                pattern: {
                  value: /^[a-zA-Z0-9]*$/,
                  message: "비밀번호의 형식과 일치하지 않습니다.",
                },
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || "비밀번호와 비밀번호 확인이 일치하지 않습니다.";
                },
              })}
            />
          </label>
          {/* 비밀번호 확인 관련 error message */}
          {errors.passwordConfirm && (
            <span role="alert" className="validation-alert-text">
              {errors.passwordConfirm.message}
            </span>
          )}
          <button type="submit" className="btn-green" disabled={isSubmitting}>
            Sign Up!
          </button>
        </form>
      </main>
    </div>
  );
};

export default SignUpPage;
