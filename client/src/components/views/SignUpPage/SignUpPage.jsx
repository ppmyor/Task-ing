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

  const onValid = (data) => {
    console.log("회원가입 성공");
    // !! 회원가입 api 호출 !!
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
          {/* 이미 존재하는 아이디인지 확인 */}
          <label htmlFor="id" className="account-label md:mt-10">
            <span className="account-label-text">ID</span>
            <input
              type="text"
              placeholder="Input Your ID"
              id="id"
              className="account-input"
              aria-invalid={!isDirty ? undefined : errors.id ? "true" : "false"}
              {...register("id", {
                required: "아이디는 필수 입력입니다.",
                // !! 자리 수 확인 !!
              })}
            />
          </label>
          {/* id 관련 error message */}
          {errors.id && (
            <span role="alert" className="validation-alert-text">
              {errors.id.message}
            </span>
          )}
          {/* 이미 존재하는 이메일인지 확인 */}
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
          {/* 이미 존재하는 닉네임인지 확인 */}
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
                // !! 자리 수 확인 !!
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
                // !! 자리 수, 패턴 확인!!
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
                required: "비밀번호 확인은 필수 입력입니다.",
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || "비밀번호가 일치하지 않습니다.";
                  // !! 자리 수, 패턴 확인!!
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
