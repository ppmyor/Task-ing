import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../src/components/views/LoginPage/LoginPage";
import MainPage from "../src/components/views/MainPage/MainPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <div className="bg-white dark:bg-zinc-800">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
