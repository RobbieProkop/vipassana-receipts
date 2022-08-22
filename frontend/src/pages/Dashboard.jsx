import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return <div className="dashboard">Dashboard</div>;
};
export default Dashboard;
