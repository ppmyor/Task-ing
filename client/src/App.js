import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../src/components/views/LoginPage/LoginPage";
import LandingPage from "./components/views/LandingPage/LandingPage";
import KakaoLogin from "./components/views/LoginPage/SocialLogin/KakaoLogin";
import NaverLogin from "./components/views/LoginPage/SocialLogin/NaverLogin";
import GithubLogin from "./components/views/LoginPage/SocialLogin/GithubLogin";
import Auth from "./hoc/Auth";

function App() {
  const AuthLandingPage = Auth(LandingPage, true);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthKakaoLoginPage = Auth(KakaoLogin, false);
  const AuthNaverLoginPage = Auth(NaverLogin, false);
  const AuthGithubLoginPage = Auth(GithubLogin, false);

  return (
    <Router>
      <div className="bg-white dark:bg-zinc-800">
        <Routes>
          <Route path="/" element={<AuthLandingPage />} />
          <Route path="/login" element={<AuthLoginPage />} />
          <Route path="/api/v1/accounts/rest-auth/kakao/" element={<AuthKakaoLoginPage />} />
          <Route path="/api/v1/accounts/rest-auth/naver/" element={<AuthNaverLoginPage />} />
          <Route path="/api/v1/accounts/rest-auth/github/" element={<AuthGithubLoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
