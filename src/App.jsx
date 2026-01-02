import { RouterProvider } from "react-router";
import { router } from "./routes/AppRouter";
import { ConfigProvider } from "antd";
import { darkTheme, lightTheme } from "./utils/theme.js";
import { useSelector } from "react-redux";

function App() {
  const mode = useSelector((state) => state.settings.mode);
  return (
    <ConfigProvider theme={mode === "dark" ? darkTheme : lightTheme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
