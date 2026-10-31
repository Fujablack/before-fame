"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function About() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white text-black flex flex-col">

            {/* Hero Section with Image */}
            <main className="flex-1">
                <section className="relative w-full h-[60vh] md:h-[80vh] bg-zinc-100 flex items-center justify-center">
                    <Image
                        src="/images/fuja.jpg"
                        alt="Fuja - Founder of Before Fame"
                        fill
                        className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                        priority
                    />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/20">
                        <h1 className="text-white text-[40px] md:text-[80px] font-hero uppercase tracking-widest leading-none drop-shadow-lg">
                            Est. 1960 AD
                        </h1>
                        {/* <p className="text-white text-3xl md:text-3xl font-ms-madi font-thin mt-4">
                            Lagos City
                        </p> */}
                    </div>
                </section>

                <section className="px-6 md:px-12 lg:px-24 py-20 max-w-[1200px] mx-auto">

                    <div className="flex flex-col gap-16 md:gap-24">

                        <div className="flex justify-center w-full">
                            <div className="flex flex-col gap-6 text-center max-w-3xl">
                                <p className="text-[14px] tracking-[2px] text-black uppercase">
                                    Back in 2015, I started rethinking streetwear fashion. Something felt missing in the Nigerian fashion scene. Not more rules. Not another way to fit in. Just more freedom to be yourself.
                                </p>
                                <p className="text-[14px] tracking-[2px] text-black uppercase">
                                    I wanted clothes that felt like me. Designs that made sense to my mind, my mood, my vibe. Things I could wear without having to explain myself to anybody.
                                </p>
                                <p className="text-[14px] tracking-[2px] text-black uppercase">
                                    So I started creating.
                                </p>
                                <p className="text-[14px] tracking-[2px] text-black uppercase">
                                    Not to follow the crowd. Not to fit into society’s little boxes. Just to express myself, feel comfortable, and wear what felt right.
                                </p>
                                <p className="text-[14px] tracking-[2px] text-black uppercase">
                                    And somewhere along the way, that feeling became <strong>Before Fame.</strong>
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center w-full pt-12 border-t border-zinc-200">
                            <div className="flex flex-col gap-6 text-center max-w-3xl">
                                <p className="text-[14px] tracking-[2px] text-black uppercase">
                                    I’m Fuja. I call the way I think freestyle thinking or simply, a vibe.
                                </p>
                                <p className="text-[14px] tracking-[2px] text-black uppercase">
                                    Anything goes. There’s no single right way to think, dress, create, or exist. If it feels right to you, explore it. If it looks different, let it. If it breaks the rules people made up for you, even better.
                                </p>
                                <p className="text-[14px] tracking-[2px] text-black uppercase">
                                    Free yourself from the pressure to think one way. Unlearn what you were told you had to be. Find your own rhythm. Wear your own mind.
                                </p>
                                <p className="text-[14px] tracking-[2px] text-black uppercase">
                                    You don’t have to be understood by everybody to be yourself.
                                </p>
                                <p className="text-[14px] tracking-[2px] text-black uppercase">
                                    Be comfortable. Be different. Be free.
                                </p>
                            </div>
                        </div>

                        {/* Before the world knew us */}
                        <div className="flex justify-center w-full pt-12 border-t border-zinc-200">
                            <div className="flex flex-col gap-6 text-center max-w-3xl">
                                <p className="text-[14px] tracking-[2px] text-black uppercase">
                                    Before the lights, there was darkness.
                                </p>
                                <p className="text-[14px] tracking-[2px] text-black uppercase">
                                    Before the noise, there was silence.
                                </p>
                                <p className="text-[14px] tracking-[2px] text-black uppercase">
                                    Before the world knew us, we were <strong>Before Fame.</strong>
                                </p>
                                <p className="text-[14px] tracking-[2px] text-black uppercase">
                                    This is more than clothes. It’s a mindset. A space for the ones who think differently, move differently, and refuse to let society define their limits.
                                </p>
                                <p className="text-[14px] tracking-[2px] text-black uppercase">
                                    I brought freestyle thinking out of my head and into the real world. That’s how Before Fame was born.
                                </p>
                                <p className="text-[14px] tracking-[2px] text-black uppercase">
                                    If this sounds like you, you’re already part of the journey.
                                </p>
                                <p className="text-[14px] tracking-[2px] text-black uppercase">
                                    No permission needed. No box to fit into. Just you, your style, your vibe.
                                </p>
                                <p className="text-[14px] tracking-[2px] text-black uppercase">
                                    Ride with us.
                                </p>
                            </div>
                        </div>

                    </div>

                </section>
            </main>
        </div>
    );
}