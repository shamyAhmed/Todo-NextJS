import TodoAddForm from '@/components/todo/TodoAddForm/TodoAddForm';
import './add.page.css';

export const dynamic = "forcec-dynamic"

const Page = () => {
    return(
        <div className="add-todo-page fixed bg-[] z-[1000] h-screen w-full top-0 left-0 flex items-center justify-center">
            <TodoAddForm />
        </div>
    )
}

export default Page