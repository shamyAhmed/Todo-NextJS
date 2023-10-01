export enum STATUS {
    DONE = "done",
    TODO = "todo",
    POSTPONED = "postponed",
    IN_PROGRESS = "inProgress"
}

export interface TodoType {
    title: string
    dueDate: Date | null
    createdAt: Date
    status: STATUS
    id: number
    list_id: number
}

export function isTodo(todo: any): todo is TodoType{
    return todo.title && Object.values(STATUS).includes(todo.status) && todo.createdAt && todo.id && todo.list_id;
}