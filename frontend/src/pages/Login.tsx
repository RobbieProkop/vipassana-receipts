import { FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { AppDispatch, RootState } from "../app/store";

const Login: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [togglePassword, setTogglePassword] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess || user) {
      navigate("/");
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="login-container">
      <h2>PRIVATE WEBSITE FOR AVF TREASURER</h2>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              placeholder="Enter Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="form-group password-input">
            <input
              type={!togglePassword ? "password" : "text"}
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div
              className="password-icon"
              onClick={() => setTogglePassword(!togglePassword)}
            >
              {!togglePassword && <FaEyeSlash />}
              {togglePassword && <FaEye />}
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Login
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
export default Login;
