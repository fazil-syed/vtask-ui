import { Alert, Button, Card, Flex, Form, Input, Space } from "antd";
import Link from "antd/es/typography/Link";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useRegisterNewUserMutation } from "../../features/auth/authApi";
import { useState } from "react";
const SignUp = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [apiError, setApiError] = useState(null);
  const [registerNewUser, { isLoading }] = useRegisterNewUserMutation();

  const onFinish = async (values) => {
    const userPayload = {
      user_name: values.username,
      email: values.email,
      password: values.password,
    };
    try {
      await registerNewUser(userPayload).unwrap();
      navigate("/login");
    } catch (error) {
      setApiError(error.data.error);
    }
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
              Create Account
            </Title>
            <Text type="secondary">Get started with vtask</Text>
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
            requiredMark={false}
            layout="vertical"
            onValuesChange={() => apiError && setApiError(null)}
            onFinish={onFinish}
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
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 8, message: "Password must be atleast 6 characters" },
              ]}
            >
              <Input.Password placeholder="create your password" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name={"confirmPassword"}
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="re-enter your password" />
            </Form.Item>
            <Form.Item label={null}>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isLoading}
              >
                Create Account
              </Button>
            </Form.Item>
          </Form>
          <Text
            type="secondary"
            style={{
              textAlign: "center",
            }}
          >
            Already have an account?{" "}
            <Link onClick={() => navigate("/login")}>Sign in</Link>
          </Text>
        </Space>
      </Card>
    </Flex>
  );
};

export default SignUp;
