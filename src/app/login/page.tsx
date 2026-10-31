"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// 1. Define the validation schema with Zod
const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// 2. Extract the TypeScript type from the schema
type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
    const [isSubmitting, setIsSubmitting] = useState(false);
      const router = useRouter();

    // 3. Initialize React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsSubmitting(true);

        // Call NextAuth
        const res = await signIn("credentials", {
            redirect: false, // We will handle redirect manually
            email: data.email,
            password: data.password,
        });

        if (res?.error) {
            // Set a general error message if login fails
            alert("Invalid email or password");
        } else {
            // Success! Go to the account page
            router.push("/");
            router.refresh(); // Refresh to update the Navbar
        }

        setIsSubmitting(false);
    };

    return (
        <div className="min-h-[80vh] flex bg-white text-black">

            {/* Left Side: Image */}
            <div className="hidden md:block md:w-1/2 relative bg-zinc-100">
                <Image
                    src="/images/fuja.jpg"
                    alt="Before Fame"
                    fill
                    className="object-cover object-center grayscale"
                    priority
                />
                <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-12">
                    <h2 className="text-white text-[40px] font-hero uppercase tracking-widest leading-none drop-shadow-lg">
                        Welcome Back.
                    </h2>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-12">
                <div className="w-full max-w-md mx-auto">

                    <div className="mb-12">
                        <h1 className="text-[32px] font-hero uppercase tracking-widest mb-2">Log In</h1>
                        <p className="text-[14px] text-zinc-500 uppercase tracking-[1px]">
                            Enter your details to access your account.
                        </p>
                    </div>

                    {/* 5. Attach handleSubmit to the form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">

                        {/* Email Input */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-[11px] uppercase tracking-[2px] text-zinc-500">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register("email")} // 6. Register the input
                                className={`bg-transparent border-b py-3 text-black focus:outline-none transition-colors ${errors.email ? "border-red-500" : "border-zinc-300 focus:border-black"
                                    }`}
                                placeholder="you@example.com"
                            />
                            {/* Show Zod error message */}
                            {errors.email && (
                                <p className="text-red-500 text-[11px] uppercase tracking-[1px] mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="text-[11px] uppercase tracking-[2px] text-zinc-500">
                                    Password
                                </label>
                                <Link href="/forgot-password" className="text-[11px] uppercase tracking-[1px] text-zinc-500 hover:text-black transition-colors">
                                    Forgot?
                                </Link>
                            </div>
                            <input
                                type="password"
                                id="password"
                                {...register("password")} // 6. Register the input
                                className={`bg-transparent border-b py-3 text-black focus:outline-none transition-colors ${errors.password ? "border-red-500" : "border-zinc-300 focus:border-black"
                                    }`}
                                placeholder="••••••••"
                            />
                            {/* Show Zod error message */}
                            {errors.password && (
                                <p className="text-red-500 text-[11px] uppercase tracking-[1px] mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-4 w-full py-4 bg-black text-white uppercase tracking-[2px] text-[13px] font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Signing In..." : "Sign In"}
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="mt-12 text-center">
                        <p className="text-[12px] uppercase tracking-[1px] text-zinc-500">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-black underline hover:opacity-50 transition-opacity">
                                Create one
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}