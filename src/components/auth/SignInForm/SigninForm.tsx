'use client';
import React, {FC, useState, useCallback} from 'react';
import LabelledInput from '@/components/general/LabelledInput/LaballedInput';
import Button from '@/components/general/Button/Button';
import validator from 'validator';
import {SignInResponse, signIn} from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth/cordova';
import {auth} from "@/lib/firebase.config.web";

interface data{
    email: string
    password: string
}

const initalState: data = {
    email: "",
    password: ""
}




const SignInForm: FC =  () => {
    const [inputs, setInputs] = useState<data>(initalState)
    const [errors, setErrors] = useState<data>(initalState)
    const router = useRouter();
    const searchParams = useSearchParams()
    const setInputsValue = useCallback((key: keyof data) => {
        return (value: string) => {
            setErrors(initalState)
            setInputs(old => ({...old, [key]: value}))
        }
    }, [])

    const setEmail = useCallback(setInputsValue("email"), [])
    const setPassword = useCallback(setInputsValue("password"), [])

    const loginHandler = async () => {
        let errors = false;
        if(!validator.isEmail(inputs.email)){
            setErrors(errors => ({...errors, email: "The Email you entered isn't in the correct format"}))
            errors = true
        }
        if(!Boolean(inputs.password)){
            setErrors(errors => ({...errors, password: "Please, Enter your password"}))
            errors = true
        }
        //* you don't have to check if the password is strong in logging in.
        if(errors === true){
            return
        }
        try{
            const {user} = await signInWithEmailAndPassword(auth, inputs.email, inputs.password)
            const {error} = await signIn("credentials", {redirect: false, id_token: await user.getIdToken()}) as SignInResponse
            if(error){
                throw new Error();
            }
            router.push(searchParams.get("redirectURL") || "/")
        }catch{
            setErrors({
                email: "The Email you have entered may be incorrect",
                password: "The Password you have entered may be incorrect"
            })
        }
    }

    return(
        <div className="signin-form h-full flex flex-col gap-10" onKeyDown={(e) => {
            if(e.key == "Enter"){
                loginHandler()
            }
            e.stopPropagation()
        }}>
            <LabelledInput 
                label='Email' 
                onChange={setEmail} 
                state={inputs.email} 
                inputId='email' 
                type='text' 
                error={Boolean(errors.email)}
                errorMessage={errors.email}
                autoFocuas
                tabIndex={1}
            />
            <LabelledInput 
                label='Password' 
                onChange={setPassword} 
                state={inputs.password} 
                inputId='password' 
                type='password' 
                error={Boolean(errors.password)}
                errorMessage={errors.password}
                tabIndex={2}

            />
            <Button 
                onClick={loginHandler}
                color='primary'
                className="mt-auto rounded-md text-center py-1 font-bold text-lg text-black"
            />
        </div>
    )
}

export default SignInForm;