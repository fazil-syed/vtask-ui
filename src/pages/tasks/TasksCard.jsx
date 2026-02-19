import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { notificationApi } from "../../components/notification";
import {
  useDeleteTaskMutation,
  useMarkTaskCompletedMutation,
  useMarkTaskInCompletedMutation,
} from "../../features/tasks/tasksApi";
import { Spinner } from "@/components/ui/spinner";
import { Check, CircleX, Edit, Trash } from "lucide-react";
import { useState } from "react";
import EditTask from "./EditTask";
import { formatDate } from "@/lib/utils";

const TasksCard = ({ task }) => {
  const [markTaskCompleted] = useMarkTaskCompletedMutation();
  const [markTaskInCompleted] = useMarkTaskInCompletedMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const markCompleteTask = async () => {
    try {
      const response = await markTaskCompleted(task.id).unwrap();
      notificationApi.success({
        title: response?.message,
      });
    } catch (error) {
      notificationApi.error({
        title: error.data?.error,
      });
    }
  };
  const taskDelete = async () => {
    try {
      const response = await deleteTask(task.id).unwrap();
      notificationApi.success({
        title: response?.message,
      });
    } catch (error) {
      notificationApi.error({
        title: error.data?.error,
      });
    }
  };
  const markInCompleteTask = async () => {
    try {
      const response = await markTaskInCompleted(task.id).unwrap();
      console.log(response);

      notificationApi.success({
        title: response?.message,
      });
    } catch (error) {
      console.log(error);

      notificationApi.error({
        title: error.data?.error,
      });
    }
  };
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };
  return (
    <>
      <EditTask
        open={isEditModalOpen}
        close={handleCloseEditModal}
        task={task}
      />
      <Item
        variant="outlined"
        className={` ${
          task?.completed ? "border-green-800" : "border-red-800"
        }`}
      >
        {/* {isLoading && <Spinner />} */}
        {
          <>
            <ItemHeader>
              <ItemTitle>{task.title}</ItemTitle>
              <ItemActions>
                <ItemMedia
                  variant="avatar"
                  className="rounded-4xl p-0.5 hover:cursor-pointer hover:bg-green-500"
                  onClick={markCompleteTask}
                >
                  <Check className="size-4" />
                </ItemMedia>
                <ItemMedia
                  variant="avatar"
                  className="rounded-4xl p-0.5 hover:cursor-pointer hover:bg-red-500"
                  onClick={markInCompleteTask}
                >
                  <CircleX className="size-4" />
                </ItemMedia>
                <ItemMedia
                  variant="avatar"
                  className="rounded-4xl p-0.5 hover:cursor-pointer hover:bg-red-500"
                  onClick={taskDelete}
                >
                  <Trash className="size-4" />
                </ItemMedia>
                <ItemMedia
                  variant="avatar"
                  className="rounded-4xl p-0.5 hover:cursor-pointer hover:bg-gray-400"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <Edit className="size-4" />
                </ItemMedia>
              </ItemActions>
            </ItemHeader>
            <ItemContent>
              <ItemDescription>{task.content}</ItemDescription>
            </ItemContent>
            <ItemFooter>
              <div>
                <span className="font-semibold">Due on</span>{" "}
                {formatDate(task?.due_at)}
              </div>
            </ItemFooter>
          </>
        }
      </Item>
    </>
  );
};

export default TasksCard;
