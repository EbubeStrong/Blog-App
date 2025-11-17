"use client"

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

function AuthLayout() {
    const [active, setActive] = useState("login");
    
    return (
        <div className="flex justify-center items-center h-full min-h-[80vh]">
            <div className="w-full max-w-md p-5 bg-card rounded-lg shadow-sm border">
                <h1 className="text-2xl font-bold text-center mb-6">Welcome!</h1>
                <Tabs value={active} onValueChange={setActive} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger className="cursor-pointer" value="login">Login</TabsTrigger>
                        <TabsTrigger className="cursor-pointer" value="register">Register</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                        <LoginForm />
                    </TabsContent>

                    <TabsContent value="register">
                        <RegisterForm onSuccess={() => setActive("login")} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default AuthLayout;