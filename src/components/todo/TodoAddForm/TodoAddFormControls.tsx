'use client';
import React, { FC, useState} from "react";
import CustomDatePicker from "@/components/general/CustomDatePicker/CustomDatePicker";
import LabelledInput from "@/components/general/LabelledInput/LaballedInput";
import Button from "@/components/general/Button/Button";
import TodoElementDropdown from "../TodoElement/TodoElementDropdown/TodoElementDropdown";
import { STATUS } from "@/types/todos";
import { useRouter } from "next/navigation";



const AddFormControls: FC = () => {
    const [dueDate, setDueDate] = useState<Date | null>(new Date())
    const [info, setInfo] = useState<{title: string, status: STATUS}>({title: "", status: STATUS.TODO})
    const router = useRouter();
    return(
        <div className="flex flex-col gap-5 h-full">
            <LabelledInput label="Title" state={info.title} onChange={(val) => setInfo((old) => ({...old, title: val}))} error={false} autoFocuas errorMessage="You cannot add an empty message" tabIndex={1} inputId="title" />
            <div className="status-selection-container flex justify-start items-center gap-4">
                <label className="font-semibold">Status</label>
                <TodoElementDropdown action={() => {}} initialState={STATUS.TODO}  />
            </div>
            <CustomDatePicker date={dueDate} setDate={setDueDate} label="Due date" id="duedate" />
            <Button text="Create" onClick={async () => {
                const response = await fetch("/api/todo/create", {method: "POST", body: JSON.stringify({title: info.title, status: info.status, dueDate: dueDate?.toISOString()})});
                if(response.status === 201){
                    router.refresh();
                    router.back();
                }
            }} color="primary" className="mt-auto mb-6 cursor-pointer" />
        </div>
    )
}

export default AddFormControls