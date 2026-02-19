import dayjs from "dayjs";
import { Alert, Card, DatePicker, Form, Input, Modal, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { notificationApi } from "../../components/notification";
import { useEditTaskMutation } from "../../features/tasks/tasksApi";

const EditTask = ({ open, close, task }) => {
  const [form] = Form.useForm();
  const [editTask] = useEditTaskMutation();
  const [apiError, setApiError] = useState(null);
  const onFinish = async (values) => {
    const updatePayload = {
      title: values?.title,
      content: values?.content || "",
      due_date: values?.due_date?.format("YYYY-MM-DD HH:mm"),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    const payload = {
      taskID: task.id,
      payload: updatePayload,
    };
    try {
      const createResponse = await editTask(payload).unwrap();

      notificationApi.success({
        title: createResponse?.message,
      });
      form.resetFields();
      close();
    } catch (error) {
      setApiError(error.data.error);
    }
  };
  useEffect(() => {
    if (task && open) {
      form.setFieldsValue({
        title: task.title,
        content: task.content,
        due_date: task.due_at ? dayjs(task.due_at) : null,
      });
    }
  }, [task, open, form]);

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
      {apiError && (
        <Alert
          title={apiError}
          type="error"
          showIcon
          style={{ marginBottom: 12 }}
        />
      )}
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
              Edit task
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
                  // required: true,
                  message: "Please add the task details",
                },
              ]}
            >
              {console.log(task)}
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

export default EditTask;
