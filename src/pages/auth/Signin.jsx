import { Alert, Button, Card, Flex, Form, Input, Space } from "antd";
import Link from "antd/es/typography/Link";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import {
  useFetchUserQuery,
  useLoginUserMutation,
} from "../../features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { markLoggedIn } from "../../features/auth/authSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const isLoggedOut = useSelector((s) => s.auth.isLoggedOut);
  const { data: user } = useFetchUserQuery(undefined, {
    skip: isLoggedOut,
  });
  const [apiError, setApiError] = useState(null);
  const handleLogin = async (values) => {
    const loginPayload = {
      email: values.email,
      password: values.password,
    };
    try {
      await loginUser(loginPayload).unwrap();
      dispatch(markLoggedIn());
      navigate("/");
    } catch (error) {
      setApiError(error.data.error);
    }
  };

  const onFinish = async (values) => {
    await handleLogin(values);
  };
  if (user) {
    return <Navigate to={"/"} replace />;
  }
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
          {apiError && (
            <Alert
              type="error"
              title={apiError}
              showIcon
              closable={{
                onClose: () => setApiError(null),
              }}
            />
          )}
          <Form
            form={form}
            name="signin"
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            onValuesChange={() => apiError && setApiError(null)}
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
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
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isLoading}
              >
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
