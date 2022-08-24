import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
      <Link to="/form">
        {" "}
        <button className="btn">Add A Receipt</button>
      </Link>
    </>
  );
};
export default Dashboard;
