import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
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
import { Check, CircleX, Trash } from "lucide-react";

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
  return (
    <>
      <Item
        variant="outlined"
        className={` ${
          task?.completed ? "border-green-800" : "border-red-800"
        }`}
      >
        {/* {isLoading && <Spinner />} */}
        {
          <>
            <ItemContent>
              <ItemTitle>{task.title}</ItemTitle>
              <ItemDescription>{task.content}</ItemDescription>
            </ItemContent>
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
            </ItemActions>
          </>
        }
      </Item>
    </>
  );
};

export default TasksCard;
