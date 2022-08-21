import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">AVF Donations</Link>
        </div>
        <ul>
          <li>
            <Link to="/login">
              <FaSignInAlt /> Login
            </Link>
            <Link to="/register">
              <FaUser /> Register
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Header;
