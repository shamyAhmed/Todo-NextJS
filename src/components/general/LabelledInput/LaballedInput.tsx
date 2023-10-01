'use client';
import React, {FC, HTMLInputTypeAttribute} from 'react';
import validator from 'validator';

interface props {
    state: string,
    onChange: (value: string) => void
    label: string,
    inputId ?: string,
    type?: HTMLInputTypeAttribute,
    error?: boolean
    errorMessage?: string
    tabIndex?: number
    autoFocuas?: boolean
}

const LabelledInput: FC<props> = ({label, onChange, state, inputId, type = "text", error = false, errorMessage = "please check that you have entered the required information in the correct format", tabIndex, autoFocuas}) => {
    inputId = inputId ? inputId : label
    return(
        <div className="labelled-input-container [&>*]:block w-full h-fit">
            <label className='font-semibold text-lg' htmlFor={inputId}>{label}</label>
            <input 
                className='border-[1px] mt-1 border-black border-solid rounded-md w-full ring-black px-2 py-1 focus:outline-none focus:ring-2'
                type={type} 
                id={inputId} 
                onChange={(e) => {
                    onChange(e.target.value)
                }}
                value={state}
                tabIndex={tabIndex}
                autoFocus={autoFocuas}
            />
            {
                error &&
                <p className='error-message text-red-500 text-sm mt-1 whitespace-pre-wrap'>{errorMessage}</p>
            }
        </div>
    )
}

export default LabelledInput;

