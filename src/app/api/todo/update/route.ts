import { NextRequest, NextResponse } from "next/server";
import { update_todo_status } from "@/utils/todo";
import { STATUS } from "@/types/todos";

export const PUT = async (request: NextRequest) => {
    const {id, status}: {id: number, status:STATUS} = await request.json();
    if (!Object.values(STATUS).includes(status) || !id){
        return NextResponse.json({message: "invalid request, check that the id and status are sent normally"}, {status: 400});
    }
    try{
        const todo = update_todo_status(id, status);
        return NextResponse.json({...todo}, {status:200})
    } catch (e){
        return NextResponse.json({message: `the todo with id ${id} doesn't exist`}, {status:404});
    }
     
    
}