import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logInSuccess } from "../../features/auth/authSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(
      logInSuccess({
        user: { name: "Syed Fazil" },
        token: "fake-jwt",
      })
    );
    navigate("/");
  };

  return (
    <Button type="primary" onClick={handleLogin}>
      Login
    </Button>
  );
};

export default Login;
