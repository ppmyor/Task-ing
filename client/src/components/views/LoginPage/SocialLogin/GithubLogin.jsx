import React, { useEffect } from "react";
import axios from "axios";
import { DOMAIN } from "../../../../config/domain";
import { useLocation, useNavigate } from "react-router-dom";

const GithubLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const GITHUB_CODE = location.search.split("=")[1];

  const request = () => {
    axios
      .get(`${DOMAIN}/accounts/rest-auth/github/callback/?code=${GITHUB_CODE}`, {
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

  return <div>githublogin</div>;
};

export default GithubLogin;
