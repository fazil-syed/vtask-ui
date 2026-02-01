import { Card, DatePicker, Form, Input, Modal, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import { useAddTasksMutation } from "../../features/tasks/tasksApi";
import { useEffect, useState } from "react";

const CreateTask = ({ open, close }) => {
  const [form] = Form.useForm();
  const [addTasks, { isLoading }] = useAddTasksMutation();
  const [apiError, setApiError] = useState(null);
  useEffect(() => {
    console.log(apiError);
  }, [apiError]);
  const onFinish = async (values) => {
    // values["due_date"] = values["due_date"]?.format("YYYY-MM-DD HH:mm");
    console.log(values);
    const createPayload = {
      title: values?.title,
      content: values?.content,
      due_date: values?.due_date?.format("YYYY-MM-DD HH:mm"),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    try {
      const createResponse = await addTasks(createPayload).unwrap();
      console.log(createResponse);
    } catch (error) {
      console.log(error);
      setApiError(error.data.message);
    }
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
            <Form.Item label="Due Date" name={"due_date"}>
              <DatePicker
                size="large"
                showTime={{ format: "HH:mm" }} // 1. Removes seconds from the dropdown                placeholder="Pick the due date"
                style={{ width: "100%" }}
                format="YYYY-MM-DD HH:mm" // 2. Removes seconds from the input box display
              />
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </Modal>
  );
};

export default CreateTask;
