import { Button, Layout, theme } from "antd";
import { Outlet } from "react-router";
import NavBar from "../navigation/NavBar";
import TopBar from "../navigation/TopBar";
import { useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../features/auth/authApi";
import { markLoggedOut } from "../features/auth/authSlice";
import { baseApi } from "../services/baseApi";
const { Header, Content, Footer, Sider } = Layout;

export default function MainLayout() {
  const {
    token: {
      borderRadiusLG,
      colorBgLayout,
      colorBgContainer,
      colorBorderSecondary,
    },
  } = theme.useToken();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const siderStyle = {
    overflow: "auto",
    position: "sticky",
    insetInlineStart: 0,
    top: 0,
    scrollbarWidth: "thin",
    scrollbarGutter: "stable",
    background: colorBgContainer,
    borderRight: `1px solid ${colorBorderSecondary}`,
    borderRadius: borderRadiusLG,
    marginTop: 16,
  };
  const headerStyle = {
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
    borderBottom: `1px solid ${colorBorderSecondary}`,
    position: "sticky",
    top: 0,
    zIndex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: "3rem",
    lineHeight: "3rem",
  };
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(markLoggedOut());
      dispatch(baseApi.util.resetApiState());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: colorBgLayout,
      }}
    >
      <Header style={headerStyle}>
        <TopBar />
      </Header>
      <Layout
        style={{
          flex: 1,
        }}
        hasSider
      >
        <Sider style={siderStyle}>
          <div
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <div style={{ flex: 1, overflow: "auto" }}>
              <NavBar />
            </div>
            <div
              style={{
                marginTop: "auto",
                padding: "8px 12px",
              }}
            >
              <Button
                type="primary"
                danger
                style={{ marginTop: "auto", borderRadius: 8 }}
                block
                onClick={handleLogout}
                size="middle"
              >
                Logout
              </Button>
            </div>
          </div>
        </Sider>
        <Layout
          style={{
            flex: 1,
            transition: "margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <Content
            style={{
              padding: 16,
              paddingBottom: 0,
              flex: 1,
            }}
          >
            <div
              style={{
                padding: 16,
                minHeight: "100%",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        Vtask ©{new Date().getFullYear()} Created by Syed Fazil
      </Footer>
    </Layout>
  );
}
