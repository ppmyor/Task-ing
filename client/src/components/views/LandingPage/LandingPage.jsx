import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { DOMAIN } from "../../../config/domain";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();

  const request = async () => {
    let body = {
      access_token: localStorage.getItem("accessToken"),
    };

    await axios
      .post(`${DOMAIN}/accounts/rest-auth/kakao/`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    request();
  }, []);

  return <div>LandingPage</div>;
};

export default LandingPage;
