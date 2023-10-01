import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth//[...nextauth]/route";
import { Session, getServerSession } from "next-auth";
import { create_todo } from '@/utils/todo'
import { STATUS } from "@/types/todos";

export const POST = async (req: NextRequest) => {
    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json("unauthorized to do this action", {status: 401})
    }

    const {title, status, dueDate: dueDateString}: {title: string, status: STATUS, dueDate: string} = await req.json();
    const {user: {id: user_id}} = session;
    const dueDate: Date = new Date(dueDateString);
    const todo = await create_todo(user_id, title, status, dueDate)
    return  NextResponse.json({
        todo: todo
    }, {status: 201})

}