import { Card, Form, Input, Modal, Space } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import React from "react";
import TextArea from "antd/es/input/TextArea";

const CreateTask = ({ open, close }) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log(values);
  };

  const onOk = () => {
    form.submit();
  };
  return (
    <Modal
      forceRender
      open={open}
      onCancel={close}
      closable={false}
      onOk={onOk}
    >
      <Card
        variant="outlined"
        styles={{
          body: {
            padding: 12,
          },
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
              level={4}
              style={{
                marginTop: 0,
              }}
            >
              Create a new task
            </Title>
          </div>
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
          >
            <Form.Item
              label={"Title"}
              name={"title"}
              rules={[
                {
                  required: true,
                  message: "Please add a title for your task",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Content"
              name={"content"}
              rules={[
                {
                  required: true,
                  message: "Please add the task details",
                },
              ]}
            >
              <TextArea />
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </Modal>
  );
};

export default CreateTask;
