import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../src/components/views/LoginPage/LoginPage";
import MainPage from "../src/components/views/MainPage/MainPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
