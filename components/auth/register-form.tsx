"use client"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Eye, EyeClosedIcon } from "lucide-react"

const registerFormSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long!'),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters")
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

type RegisterFormValues = z.infer<typeof registerFormSchema>

function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
    // false = hidden, true = visible
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });

    // Initialize form values
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    });

    const onRegisterSubmit = async (values: RegisterFormValues) => {
        setIsLoading(true)

        try {
            console.log(values)
        } catch (error) {

        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onRegisterSubmit)}
                className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-full px-3 py-2 border rounded-md"
                                    {...field}
                                    placeholder="Enter your Full Name"
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

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
                            <FormMessage/>
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
                                        type={showPassword.password ? "text" : "password"}
                                        placeholder="Enter your password"
                                    />

                                    <Button
                                        type="button"
                                        onClick={() => setShowPassword((toggle) => ({ ...toggle, password: !toggle.password }))}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center p-1 text-sm text-muted-foreground rounded-md hover:bg-accent/10 bg-transparent"
                                        aria-label={showPassword.password ? "Hide password" : "Show password"}
                                    >
                                        {showPassword.password ? (
                                            // eye off (visible -> offer to hide)
                                            <EyeClosedIcon className="h-5 w-5" />
                                        ) : (
                                            // eye (hidden -> offer to show)
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        className="w-full px-3 py-2 pr-10 border rounded-md"
                                        {...field}
                                        type={showPassword.confirmPassword ? "text" : "password"}
                                        placeholder="Enter your password again"
                                    />

                                    <Button
                                        type="button"
                                        onClick={() => setShowPassword((toggle) => ({ ...toggle, confirmPassword: !toggle.confirmPassword }))}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center p-1 text-sm text-muted-foreground rounded-md hover:bg-accent/10 bg-transparent"
                                        aria-label={showPassword.confirmPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword.confirmPassword ? (
                                            // eye off (visible -> offer to hide)
                                            <EyeClosedIcon className="h-5 w-5" />
                                        ) : (
                                            // eye (hidden -> offer to show)
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Create Account"}
                </Button>
            </form>
        </Form>
    )
}

export default RegisterForm