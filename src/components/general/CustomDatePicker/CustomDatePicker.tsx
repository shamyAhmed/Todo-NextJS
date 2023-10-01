'use client';
import React, {FC, useState, forwardRef, SetStateAction, Dispatch} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Button = forwardRef(({value, onClick}: any, ref: any) => {
    return (
        <button onClick={onClick} ref={ref} className='border-2  text-black text-sm rounded-lg p-2'>
            {value}
        </button>
    )
})

interface props{
    date: Date | null
    setDate: Dispatch<React.SetStateAction<Date | null>>
    label: string
    id?: string
}

const CustomDatePicker: FC<props> = ({date, setDate, label, id}) => {
    id = label
    return (
        <div className='flex items-center gap-7  w-full h-fit'>
        <label className='font-semibold text-lg' htmlFor={id}>{label}</label>
        <DatePicker 
            selected={date}
            onChange={(date) => setDate(date)}
            customInput={<Button />}
            dateFormat={"dd-MM-yyyy"}
            showIcon
            id={id}
        />
        </div>
        
    )
}

export default CustomDatePicker