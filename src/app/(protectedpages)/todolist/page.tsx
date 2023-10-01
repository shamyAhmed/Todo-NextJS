import TodoAddButton from "@/components/todo/TodoAddButton/TodoAddButton";
import TodoStatusFrame from "@/components/todo/TodoStatusFrame/TodoStatusFrame";
import { STATUS, TodoType, isTodo } from "@/types/todos";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { get_todos } from "@/utils/todo";
import { redirect } from "next/navigation";


const Page = async () => {
    const session = await getServerSession(authOptions)
    if(!session){
        return redirect("/auth/signin")
    }
    const todos = await get_todos(session!.user.id);
    const filtered_Todo: TodoType[] = []
    const filtered_Done: TodoType[] = []
    const filtered_Postponed: TodoType[]= []
    const filtered_InProgress: TodoType[] = []
    todos.forEach((todo) => {
        if(isTodo(todo)){
            if(todo.status === STATUS.TODO){
                filtered_Todo.push(todo)
            }else if (todo.status === STATUS.IN_PROGRESS){
                filtered_InProgress.push(todo)
            }else if (todo.status === STATUS.DONE){
                filtered_Done.push(todo)
            }else{
                filtered_Postponed.push(todo)
            }
        }
    })

    return(
        <div className="min-h-screen h-fit w-full flex flex-col gap-10">
            <TodoStatusFrame todos={filtered_Todo} title={STATUS.TODO} />
            <TodoStatusFrame todos={filtered_InProgress} title={STATUS.IN_PROGRESS} />
            <TodoStatusFrame todos={filtered_Postponed} title={STATUS.POSTPONED} />
            <TodoStatusFrame todos={filtered_Done} title={STATUS.DONE} />
            <TodoAddButton />
        </div>
    )
}

export default Page;