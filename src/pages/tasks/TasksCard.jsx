import { Button, Card } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { useMarkTaskCompletedMutation } from "../../features/tasks/tasksApi";
import { notificationApi } from "../../components/notification";

const TasksCard = ({ task }) => {
  const [markTaskCompleted, { isLoading }] = useMarkTaskCompletedMutation();
  const completeTask = async () => {
    try {
      const response = await markTaskCompleted(task.id).unwrap();
      console.log(response);

      notificationApi.success({
        title: response?.message,
      });
    } catch (error) {
      console.log(error.data?.error);

      notificationApi.error({
        title: error.data?.error,
      });
    }
  };
  return (
    <Card>
      <Title
        level={4}
        style={{
          marginTop: 0,
        }}
      >
        {task.title}
      </Title>
      <Button onClick={completeTask}>Mark as completed</Button>
    </Card>
  );
};

export default TasksCard;
