import { Outlet } from "react-router";
import { Layout } from "antd";

const { Content } = Layout;

const AuthLayout = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <Content
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Outlet />
    </Content>
  </Layout>
);

export default AuthLayout;
