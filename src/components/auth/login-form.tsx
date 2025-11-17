"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosedIcon } from "lucide-react";
import { Button } from "../ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


//schema
const loginFormSchema = z.object({
    email: z.email("Invalid email address"),
    //   email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(true);

    const router = useRouter();

    // Initialize form values
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onLoginSubmit = async (values: LoginFormValues) => {
        setIsLoading(true)

        try {
            const {error} = await signIn.email({
                email: values.email,
                password: values.password,
                rememberMe: true
            })
            if (error) {
                // handle error
                toast.error('Failed to login. Please check your credentials and try again.')
                return
            }
            toast.success('Successfully logged in!')
            router.push('/')
            // console.log(values)
        } catch (error) {
            console.log(error)
        }finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form} >
            <form
                onSubmit={form.handleSubmit(onLoginSubmit)}
                className="space-y-5">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-full px-3 py-2 border rounded-md"
                                    {...field}
                                    placeholder="Enter your email address"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        className="w-full px-3 py-2 pr-10 border rounded-md"
                                        {...field}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                    />

                                    <Button
                                        type="button"
                                        onClick={() => setShowPassword((toggle) => !toggle)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center p-1 text-sm text-muted-foreground rounded-md hover:bg-accent/10 bg-transparent"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {!showPassword ? (
                                            // eye
                                            <Eye className="h-5 w-5" />
                                        ) : (
                                            // eye off
                                            <EyeClosedIcon className="h-5 w-5" />
                                        )}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm