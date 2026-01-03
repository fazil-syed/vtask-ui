import { Button, Card, Flex, Form, Input, Space } from "antd";
import Link from "antd/es/typography/Link";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logInSuccess } from "../../features/auth/authSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const handleLogin = () => {
    dispatch(
      logInSuccess({
        user: { name: "Syed Fazil" },
        token: "fake-jwt",
      })
    );
    navigate("/");
  };

  const onFinish = (values) => {
    console.log(values);
    handleLogin();
  };
  const onFinishFailed = (errInfo) => {
    console.log("Failed Login:", errInfo);
  };

  return (
    <Flex align="center" justify="center" style={{ minHeight: "100vh" }}>
      <Card
        variant="borderless"
        style={{
          minWidth: 350,
        }}
      >
        <Space
          orientation="vertical"
          size={"large"}
          style={{
            width: "100%",
          }}
        >
          <div
            style={{
              textAlign: "center",
            }}
          >
            <Title
              level={3}
              style={{
                marginBottom: 0,
              }}
            >
              Sign in
            </Title>
            <Text type="secondary">Welcome back to vtask</Text>
          </div>
          <Form
            form={form}
            name="signin"
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>
          <Text
            type="secondary"
            style={{
              textAlign: "center",
            }}
          >
            New User?{" "}
            <Link onClick={() => navigate("/register")}>Create an account</Link>
          </Text>
        </Space>
      </Card>
    </Flex>
  );
};

export default Login;
