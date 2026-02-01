import { RouterProvider } from "react-router";
import { router } from "./routes/AppRouter";
import { ConfigProvider } from "antd";
import { darkTheme, lightTheme } from "./utils/theme.js";
import { useDispatch, useSelector } from "react-redux";
import { useFetchUserQuery } from "./features/auth/authApi.js";
import { useEffect } from "react";
import { markLoggedIn, markLoggedOut } from "./features/auth/authSlice.js";
import { baseApi } from "./services/baseApi.js";

function App() {
  const mode = useSelector((state) => state.settings.mode);
  const dispatch = useDispatch();
  const authState = useSelector((s) => s.auth.authState);
  const { data: user, isError } = useFetchUserQuery(undefined, {
    skip: authState !== "unknown",
  });
  useEffect(() => {
    if (user) dispatch(markLoggedIn());
    if (isError) {
      dispatch(markLoggedOut());
      dispatch(baseApi.util.resetApiState());
    }
  }, [user, isError]);
  return (
    <ConfigProvider theme={mode === "dark" ? darkTheme : lightTheme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
