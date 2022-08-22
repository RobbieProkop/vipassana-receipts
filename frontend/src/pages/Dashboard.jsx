import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import ReceiptForm from "../components/ReceiptForm";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.username}</h1>
        <p>Receipts Dashboard</p>
      </section>

      <ReceiptForm />
    </>
  );
};
export default Dashboard;
