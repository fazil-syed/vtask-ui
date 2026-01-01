import { useGetTasksQuery } from '@/features/tasks/tasksApi'

export default function TasksPage() {
    const { data: tasks = [], isLoading } = useGetTasksQuery()

    if (isLoading) return <p>Loading...</p>

    return (
        <>
            <h1>Tasks</h1>
            {tasks.map((task) => (
                <>
                    {console.log(task)

                    }
                    {task?.ID}</>
            ))}
        </>
    )
}
