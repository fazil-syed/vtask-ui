import { Layout, theme } from "antd";
import { Outlet } from "react-router";
import NavBar from "../navigation/NavBar";
import TopBar from "../navigation/TopBar";
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
          <NavBar />
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
