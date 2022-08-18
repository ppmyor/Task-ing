import React, { useEffect } from "react";
import axios from "axios";
import { DOMAIN } from "../../../../config/domain";
import { useLocation, useNavigate } from "react-router-dom";

const NaverLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const NAVER_CODE = location.search.split("=")[1].split("&")[0];
  const STATE = location.search.split("=")[2];

  const request = async () => {
    let body = {
      code: NAVER_CODE,
      state: STATE,
    };

    await axios
      .post(`${DOMAIN}/accounts/rest-auth/naver/`, body, {
        headers: {
          "Content-Type": "application/json",
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

  return <div>NaverLogin</div>;
};

export default NaverLogin;
