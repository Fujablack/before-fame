"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      // Success! Send them to the login page
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex bg-white text-black">
      <div className="hidden md:block md:w-1/2 relative bg-zinc-100">
        <Image src="/images/fuja.jpg" alt="Before Fame" fill className="object-cover object-center grayscale" priority />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-12">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-12">
            <h1 className="text-[32px] font-hero uppercase tracking-widest mb-2">Create Account</h1>
            <p className="text-[14px] text-zinc-500 uppercase tracking-[1px]">Join Before Fame.</p>
          </div>

          {error && <p className="text-red-500 text-[12px] uppercase mb-4">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-[2px] text-zinc-500">Name</label>
              <input {...register("name")} className={`bg-transparent border-b py-3 focus:outline-none ${errors.name ? "border-red-500" : "border-zinc-300 focus:border-black"}`} placeholder="Fuja" />
              {errors.name && <p className="text-red-500 text-[11px] uppercase mt-1">{errors.name.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-[2px] text-zinc-500">Email</label>
              <input type="email" {...register("email")} className={`bg-transparent border-b py-3 focus:outline-none ${errors.email ? "border-red-500" : "border-zinc-300 focus:border-black"}`} placeholder="you@example.com" />
              {errors.email && <p className="text-red-500 text-[11px] uppercase mt-1">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-[2px] text-zinc-500">Password</label>
              <input type="password" {...register("password")} className={`bg-transparent border-b py-3 focus:outline-none ${errors.password ? "border-red-500" : "border-zinc-300 focus:border-black"}`} placeholder="••••••••" />
              {errors.password && <p className="text-red-500 text-[11px] uppercase mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="mt-4 w-full py-4 bg-black text-white uppercase tracking-[2px] text-[13px] font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50">
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-[12px] uppercase tracking-[1px] text-zinc-500">
              Already have an account?{" "}
              <Link href="/login" className="text-black underline hover:opacity-50">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}