import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DOMAIN } from "../../../../config/domain";

const KakaoLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const KAKAO_CODE = location.search.split("=")[1];

  const request = async () => {
    console.log(KAKAO_CODE);
    await axios
      .get(`${DOMAIN}/accounts/rest-auth/kakao/callback/?code=${KAKAO_CODE}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .then((response) => {
        localStorage.setItem("accessToken", response.data.access_token);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    request();
  }, []);

  return <div>KakaoLogin</div>;
};

export default KakaoLogin;
