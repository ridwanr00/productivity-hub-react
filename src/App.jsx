import "./App.css";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <Navbar></Navbar>
        <main className="container mx-auto mt-6 p-4">
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <Footer></Footer>
      </AuthProvider>
    </div>
  );
}

export default App;
