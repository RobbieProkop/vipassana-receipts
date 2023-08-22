import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { AppDispatch, RootState } from "../app/store";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="container">
        {user ? (
          <>
            <div className="logo">
              <Link to="/">AVF Donations</Link>
            </div>
            <ul>
              <li>
                <button className="btn btn-edit" onClick={onLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </>
        ) : (
          <>
            <div className="logo">
              <p>AVF Donations</p>
            </div>
            <ul>
              <li>
                <Link to="/login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </header>
  );
};
export default Header;
