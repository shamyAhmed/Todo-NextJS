import Link from "next/link"
import Image from "next/image"
import plusIcon from "@/assets/images/todo/plus.png";

const TodoAddButton = () => {
    return(
        <Link href={"/todolist/add"} className="add-todo-button z-[1] fixed flex justify-center items-center h-[50px] w-[50px] bg-primary rounded-full bottom-5 right-5 border-[1px] shadow-sm hover:bg-green-500 cursor-pointer">
            <Image 
                src={plusIcon}
                alt="Add"
                height={35}
                width={35}
                className="text-white object-cover"

            />
        </Link>
    )
}

export default TodoAddButton