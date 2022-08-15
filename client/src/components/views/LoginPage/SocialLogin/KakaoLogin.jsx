import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { KAKAO_TOKEN_URL } from "../../../../config/OAuth";
import { useEffect } from "react";

const KakaoLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = location.search.split("=")[1];

  const getKakaoToken = () => {
    fetch(`https://kauth.kakao.com/oauth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `${KAKAO_TOKEN_URL}&code=${KAKAO_CODE}`,
    })
      .then((response) => response.json())
      .catch((error) => console.log("get token error: ", error))
      .then((data) => {
        localStorage.setItem("accessToken", data.access_token);
        navigate("/");
      });
  };

  useEffect(() => {
    if (!location.search) return;
    getKakaoToken();
  }, []);

  return <div>KakaoLogin</div>;
};

export default KakaoLogin;
