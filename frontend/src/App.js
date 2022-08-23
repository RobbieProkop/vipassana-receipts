import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import ReceiptForm from "./pages/ReceiptForm";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="body-container">
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/form" element={<ReceiptForm />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </div>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
