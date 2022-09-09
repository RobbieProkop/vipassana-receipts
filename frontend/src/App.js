import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Confirm from "./components/Confirm";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ReceiptForm from "./pages/ReceiptForm";
import EditReceiptForm from "./pages/EditReceiptForm";
import ErrorPage from "./pages/ErrorPage";
import ReceiptPage from "./pages/ReceiptPage";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="body-container">
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/:id" element={<ReceiptPage />}></Route>
            <Route path="/:id/confirm" element={<Confirm />}></Route>
            <Route path="/edit/:id" element={<EditReceiptForm />}></Route>
            <Route path="/form" element={<ReceiptForm />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </div>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
