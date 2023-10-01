import prisma from '@/lib/db'
import { STATUS } from '@/types/todos'
import { removeTimeISO } from './time'


export const create_todo = async (userId: string, title: string, status: STATUS, dueDate?: Date) => {
    if(!title || !userId || !status){
        return
    }
    try{
        const todo = await prisma.todo.create({
            data:{
                list: {
                    connect: {
                       owner_id: userId 
                    }
                },
                title: title,
                dueDate: dueDate,
                status
            }
        })
        return todo
    }catch (e: any){
        if(e.code == "P2025"){
            const todoList = await prisma.todoList.create({
                data: {
                    user: {
                        connect: {uid: userId}
                    }, 
                    todos: {
                        create: {
                            title: title,
                            status: status,
                            dueDate: dueDate,
                        }
                    }
                },
                include: {
                    todos: true
                }
                })
            return todoList.todos;
        }
        
    }
    return "success";
}

export const get_todos = async (user_id: string) => {
        const todo_list = await prisma.todoList.findUnique({
            where: {
                owner_id: user_id,
            },
            include: {
                todos: true
            }
        })
        if(todo_list){
            const {todos} = todo_list;
            return todos
        }else{
            return []
        }

    
}


export const update_todo_status = async (id: number, status: STATUS) => {
    const todo = await prisma.todo.update({where:{ id: id}, data: {
        status: status
    },include: {list: true}})
    if(status == STATUS.DONE){
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        await prisma.record.upsert({
            where: {
                report_per_date: {
                    owner: todo.list.owner_id,
                    recordDate: date
                },
            },
            create: {
                user: {
                    connect: {
                        uid: todo.list.owner_id
                    }
                },
                completed: 1,
                recordDate: date
            },  
            update: {
                completed: {
                    increment: 1
                }
            }
            
        })
    }
    return todo;
}

