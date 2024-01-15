'use client';

import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation"
import { useMemo, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function SignInPage() {

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <div className='fixed inset-0 w-full h-full'>
            <div className='flex flex-col items-center justify-center w-full h-full'>
                <div className='flex flex-col items-center justify-center w-1/2 h-full'>
                    <h1 className='text-5xl font-bold text-center'>
                        Sign Into Caboose
                    </h1>
                    <Button onPress={() => signIn("discord", {
                        callbackUrl: "/"
                    })}>
                        Login with Discord
                    </Button>
                    <Button onPress={() => signIn("google", {
                        callbackUrl: "/"
                    })}>
                        Login with Google
                    </Button>
                    <Input
                        type="email"
                        label="Email"
                        placeholder="awesome@email.com"
                        isRequired
                        value={emailValue}
                        onValueChange={setEmailValue}
                    />
                    <Input
                        type={isPasswordVisible ? "text" : "password"}
                        label="Password"
                        placeholder="secret"
                        isRequired
                        value={passwordValue}
                        onValueChange={setPasswordValue}
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                                {isPasswordVisible ? <IoEyeOff className="text-2xl" /> : <IoEye className="text-2xl" />}
                            </button>
                        }
                    />
                    <Button onPress={() => signIn("credentials", {
                        email: emailValue,
                        password: passwordValue,
                        callbackUrl: "/"
                    })}>
                        Login with Credentials
                    </Button>
                </div>
            </div>
        </div>
    )
}