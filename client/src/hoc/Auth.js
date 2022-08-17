import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth(SpecificComponent, option) {
  function AuthenticationCheck() {
    const navigate = useNavigate();

    useEffect(() => {
      const findToken = localStorage.getItem("accessToken");
      console.log(findToken);
      if (findToken === null) {
        if (option === true) {
          // 유저는 로그인 하지 않은 상태, 로그인 한 회원만 진입이 가능한 페이지 접근 시
          navigate("/login");
        }
      } else {
        // 유저는 로그인 한 상태, 로그인 한 회원은 진입이 불가한 페이지 접근 시
        if (!option) {
          navigate("/");
        }
      }
    }, []);
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}

export default Auth;
