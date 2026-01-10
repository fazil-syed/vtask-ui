import { useGetTasksQuery } from "@/features/tasks/tasksApi";
import { Button, Col, Modal, Row, Space } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import CreateTask from "./CreateTask";

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
        <Col>
          <Title level={2} style={{ marginTop: 2 }}>
            Tasks
          </Title>
        </Col>
        <Col>
          <Button
            variant="solid"
            color="green"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Add new
          </Button>
        </Col>
      </Row>
    </>
  );
}
