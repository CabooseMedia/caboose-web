'use client';

import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation"
import { useMemo, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function JoinPage() {
    const searchParams = useSearchParams();
    const code = searchParams.get("code");
    const email = searchParams.get("email");

    const [codeValue, setCodeValue] = useState(code ?? '');
    const [emailValue, setEmailValue] = useState(email ?? '');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('')

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const codeRegex = /^[A-Z0-9]{8}$/;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(codeValue, emailValue, passwordValue, confirmPasswordValue);
        signIn("credentials", {
            code: codeValue,
            email: emailValue,
            password: passwordValue,
            callbackUrl: "/"
        });
    }

    const isCodeValid = useMemo(() => {   
        return codeRegex.test(codeValue);
    }, [codeValue]);

    const isEmailValid = useMemo(() => {
        return emailRegex.test(emailValue);
    }, [emailValue]);

    const isPasswordValid = useMemo(() => {
        return (passwordValue == confirmPasswordValue || confirmPasswordValue.length == 0) && passwordValue.length >= 8;
    }, [passwordValue, confirmPasswordValue]);

    const isConfirmPasswordValid = useMemo(() => {
        return (passwordValue == confirmPasswordValue || passwordValue.length == 0) && confirmPasswordValue.length >= 8;
    }, [passwordValue, confirmPasswordValue]);

    const isAllValid = useMemo(() => {
        return isCodeValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
    }, [isCodeValid, isEmailValid, isPasswordValid, isConfirmPasswordValid]);

    return (
        <div className='fixed inset-0 w-full h-full'>
            <div className='flex flex-col items-center justify-center w-full h-full'>
                <div className='flex flex-col items-center justify-center w-1/2 h-full'>
                    <h1 className='text-5xl font-bold text-center'>
                        Join Caboose
                    </h1>
                    <form onSubmit={onSubmit}>
                        <Input
                            type="text"
                            label="Invite Code"
                            placeholder="--------"
                            isRequired
                            value={codeValue}
                            onValueChange={(e) => {
                                setCodeValue(e.toUpperCase())
                            }}
                            isInvalid={isCodeValid ? false : (codeValue.length == 0 ? false : true)}
                            color={isCodeValid ? "success" : (codeValue.length == 0 ? "default" : "danger")}
                        />
                        <Input
                            type="email"
                            label="Email"
                            placeholder="awesome@email.com"
                            isRequired
                            value={emailValue}
                            onValueChange={setEmailValue}
                            isInvalid={isEmailValid ? false : (emailValue.length == 0 ? false : true)}
                            color={isEmailValid ? "success" : (emailValue.length == 0 ? "default" : "danger")}
                        />
                        <Input
                            type={isPasswordVisible ? "text" : "password"}
                            label="Password"
                            placeholder="secret"
                            isRequired
                            value={passwordValue}
                            onValueChange={setPasswordValue}
                            isInvalid={isPasswordValid ? false : (passwordValue.length == 0 ? false : true)}
                            color={isPasswordValid ? "success" : (passwordValue.length == 0 ? "default" : "danger")}
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                                    {isPasswordVisible ? <IoEyeOff className="text-2xl"/> : <IoEye className="text-2xl"/>}
                                </button>
                            }
                        />
                        <Input
                            type={isConfirmPasswordVisible ? "text" : "password"}
                            label="Confirm Password"
                            placeholder="secret"
                            isRequired
                            value={confirmPasswordValue}
                            onValueChange={setConfirmPasswordValue}
                            isInvalid={isConfirmPasswordValid ? false : (confirmPasswordValue.length == 0 ? false : true)}
                            color={isConfirmPasswordValid ? "success" : (confirmPasswordValue.length == 0 ? "default" : "danger")}
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                                    {isConfirmPasswordVisible ? <IoEyeOff className="text-2xl" /> : <IoEye className="text-2xl" />}
                                </button>
                            }
                        />
                        <Button
                            type={isAllValid ? "submit" : "button"}
                            color="primary"
                            isDisabled={!isAllValid}
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}