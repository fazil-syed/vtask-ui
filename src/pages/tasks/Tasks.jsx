import { useGetTasksQuery } from "@/features/tasks/tasksApi";
import { Button, Col, Modal, Row, Space } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import CreateTask from "./CreateTask";
import TasksCard from "./TasksCard";

export default function TasksPage() {
  const { data: tasks = [], isLoading } = useGetTasksQuery();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };
  return (
    <>
      <CreateTask open={isCreateModalOpen} close={handleCloseCreateModal} />
      <Row justify={"space-between"}>
        <Col span={22}>
          <Title level={2} style={{ marginTop: 2 }}>
            Tasks
          </Title>
        </Col>
        <Col span={2}>
          <Button
            variant="solid"
            color="green"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Add new
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {tasks?.map((task) => (
          <Col key={task.id} span={6}>
            <TasksCard task={task} />
          </Col>
        ))}
      </Row>
    </>
  );
}
