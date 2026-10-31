"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Added Image import

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/ajax/beforefameofficial@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">

      <div className="relative w-full h-[40vh] md:h-[50vh]">
        <Image
          src="/images/bg5.jpg"
          alt="Contact Us Background"
          fill
          className="object-cover object-center"
          priority
        />

        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="uppercase text-white text-[50px] md:text-[80px] tracking-[4px]">
            Contact Us
          </h1>
        </div>
      </div>

      <main className="flex-1 flex justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <h2 className="text-[30px] uppercase tracking-[2px] mb-2">Get in touch</h2>
          <p className="text-zinc-600 font-light text-sm mb-8">Have a question about sizing, orders, or just want to say hi? Drop us a message.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs uppercase tracking-[1.4px] text-zinc-500">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="bg-transparent border-b border-zinc-300 py-2 text-black focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs uppercase tracking-[1.4px] text-zinc-500">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="bg-transparent border-b border-zinc-300 py-2 text-black focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs uppercase tracking-[1.4px] text-zinc-500">Message</label>
              <textarea
                name="message"
                id="message"
                required
                rows={4}
                className="bg-transparent border-b border-zinc-300 py-2 text-black focus:outline-none focus:border-black transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-4 py-3 bg-black text-white uppercase tracking-[1.4px] text-[14px] font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>

            {/* Success/Error Messages */}
            {status === "success" && (
              <p className="text-green-600 text-sm text-center mt-4">Message sent successfully! We'll get back to you soon.</p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-sm text-center mt-4">Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}