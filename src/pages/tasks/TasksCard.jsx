import { Card } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

const TasksCard = ({ task }) => {
  return (
    <Card>
      {console.log(task)}
      <Title
        level={4}
        style={{
          marginTop: 0,
        }}
      >
        {task.title}
      </Title>
    </Card>
  );
};

export default TasksCard;
