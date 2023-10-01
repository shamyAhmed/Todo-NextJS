'use client';
import React, {useState, useCallback} from "react";
import {redirect, useRouter, useSearchParams} from 'next/navigation'
import validator from "validator";
import LabelledInput from "@/components/general/LabelledInput/LaballedInput";
import Button from "@/components/general/Button/Button";
import {auth} from "@/lib/firebase.config.web";
import {createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { FirebaseError } from "firebase/app";
import { ToastContainer, toast } from 'react-toastify';
import {SignInResponse, signIn} from 'next-auth/react';
import 'react-toastify/ReactToastify.min.css';


interface inputsType{
    email: string
    name: string
    password: string
    repeatPassword: string
}

const initalData: inputsType = {
    email: "",
    name: "",
    password: "",
    repeatPassword: ""
}


const SignupForm = () => {
    const [inputs, setInputs] = useState<inputsType>(initalData);
    const [errors, setErrors] = useState<inputsType>(initalData);
    const router = useRouter();
    const searchParams = useSearchParams();

    const setInputsValue = useCallback((key: keyof inputsType) => {
        return (value: string) => {
            setErrors(initalData)
            setInputs(old => ({...old, [key]: value}))
        }
    }, [])

    const setName = useCallback(setInputsValue("name"), [])
    const setEmail = useCallback(setInputsValue("email"), [])
    const setPassword = useCallback(setInputsValue("password"), [])
    const setRepeatedPassword = useCallback(setInputsValue("repeatPassword"), [])
    const isErroring: boolean = Boolean(errors.email) || Boolean(errors.password) || Boolean(errors.repeatPassword) || Boolean(errors.name)

    const registerHandler = async () => {
        let invalidInputs: boolean = false;
        if(!validator.isEmail(inputs.email)){
            setErrors(old => ({...old, email: "The Email you entered isn't valid"}))
            invalidInputs = true;
        }

        if(!validator.isStrongPassword(inputs.password)){
            const formPasswordErrorMessage: (str: string, newError: string) => string = (passwordError, newError) => {
                let newPasswordError: string = `${Boolean(passwordError) ? passwordError + "\n": ""}${newError}`
                return newPasswordError;
            }
            invalidInputs = true;
            let passwordError = ""
            const symbols = ["@", "#", "$", "/", "%", "^"];
            const containsSymbols = symbols.some(symbol => {
                return inputs.password.includes(symbol)
            })
            if(!containsSymbols){
                passwordError = formPasswordErrorMessage(passwordError, "- Your password should contain a symbol")
            }
            if(!(inputs.password.match(/[0-9]/))){
                passwordError = formPasswordErrorMessage(passwordError, "- Your password should contain a number")
            }
            if(!(inputs.password.match(/[A-Z]/))){
                passwordError = formPasswordErrorMessage(passwordError, "- Your password should contain a Capital letter")
            }
            if(!(inputs.password.match(/[a-z]/))){
                passwordError = formPasswordErrorMessage(passwordError, "- Your password should contain a lowercase letter")
            }
            if(inputs.password.length < 8){
                passwordError = formPasswordErrorMessage(passwordError, "- Your password should contain atleat 8 characters")
            }

            setErrors(old => ({...old, password: passwordError}))
        }

        if(inputs.password != inputs.repeatPassword){
            invalidInputs = true
            setErrors(old => ({...old, repeatPassword: "Passwords Do not match"}))
        }

        if(inputs.name.length < 5){
            invalidInputs = true
            setErrors(old => ({...old, name: "The username must have at least 5 characters"}))
        }

        if(invalidInputs){
            return
        }
        let user;
        try{
            user = (await createUserWithEmailAndPassword(auth, inputs.email, inputs.password)).user
            await updateProfile(user, {displayName: inputs.name})
            user = (await signInWithEmailAndPassword(auth, inputs.email, inputs.password)!).user
            const token = await user.getIdToken();
            const {error} = await signIn("credentials", {
                redirect: false,
                id_token: token
            }) as SignInResponse

            if(error){
                throw new Error("")
            }

            router.push(searchParams.get("redirectURL") || "/")
        }catch (e){
            if(e instanceof FirebaseError && e.code === "auth/email-already-in-use"){
                setErrors({
                    email: "The Email you entered may have already been used", 
                    name: "The username you entered may have already been used", 
                    password: "", 
                    repeatPassword: ""
                })
            }else{
                if(user){
                    await deleteUser(user)
                }
                toast.error("something went wrong, please try again later.")
            }
        }

    }

    return(
       <>
         <div className={`signup-form h-full flex flex-col gap-10 ${isErroring? "gap-4" : ""}`} onKeyDown={(e) => {
            if(e.key == "Enter"){
                registerHandler()
            }
        }}>
            <LabelledInput
                onChange={setEmail}
                label="Email"
                error={Boolean(errors.email)}
                state={inputs.email}
                errorMessage={errors.email || "The email isn't entered correctly"}
                inputId="email"
                type="text"
                autoFocuas
                tabIndex={1}
            />
            <LabelledInput
                onChange={setName}
                label="Username"
                error={Boolean(errors.name)}
                state={inputs.name}
                errorMessage={errors.name || "The username isn't entered correctly"}
                inputId="username"
                type="text"
                tabIndex={2}

            />
            <LabelledInput
                onChange={setPassword}
                label="Password"
                error={Boolean(errors.password)}
                state={inputs.password}
                errorMessage={errors.password || "The Password isn't entered correctly"}
                inputId="password"
                type="password"
                tabIndex={3}
            />
            <LabelledInput
                onChange={setRepeatedPassword}
                label="Repeat Your Password"
                error={Boolean(errors.repeatPassword)}
                state={inputs.repeatPassword}
                errorMessage={errors.repeatPassword || "The Repeated Password isn't entered correctly"}
                inputId="password-repeat"
                type="password"
                tabIndex={4}
            />
            <Button
                onClick={registerHandler}
                color="primary"
                text="Create an Account"
                className="text-center capitalize"
            />
            <ToastContainer
                autoClose={2000}
                pauseOnFocusLoss={false}
                pauseOnHover={false}
                draggable={false}
                closeOnClick
                position="bottom-center"
                limit={1}

            />
        </div>
       
       </>
    )
}

export default SignupForm