import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../src/components/views/LoginPage/LoginPage";
import LandingPage from "./components/views/LandingPage/LandingPage";
import KakaoLogin from "./components/views/LoginPage/SocialLogin/KakaoLogin";

function App() {
  return (
    <Router>
      <div className="bg-white dark:bg-zinc-800">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/api/v1/accounts/rest-auth/kakao/" element={<KakaoLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
