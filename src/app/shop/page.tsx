"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// 1. Add all your products here
const products = [
    { id: 1, name: "Leather Overcoat", price: "$99.00", image: "/images/1.jpg" },
    { id: 2, name: "Oversized T-Shirt", price: "$22.00", image: "/images/4.jpg" },
    { id: 3, name: "The Hundred Hoody", price: "$22.00", image: "/images/2.jpg" },
    { id: 4, name: "Winter Sweater", price: "$85.00", image: "/images/98.jpg" },
    { id: 5, name: "Cargo Pants", price: "$65.00", image: "/images/99.jpg" },
    { id: 6, name: "Freestyle Cap", price: "$30.00", image: "/images/fuja.jpg" },
];

export default function Shop() {

    return (
        <div className="min-h-screen bg-white text-black flex flex-col">
            <main className="flex-1 max-w-[1920px] mx-auto w-full px-4 sm:px-6 md:px-12 py-12 md:py-20">
                <div className="flex justify-between items-end mb-5">
                    <h1 className="text-[14px] md:text-[48px] uppercase tracking-widest text-black">
                        All Pieces
                    </h1>
                    {products.length === 1 ? <span className="text-[14px] uppercase tracking-[2px] text-zinc-500">
                        {products.length} Item
                    </span> : <span className="text-[14px] uppercase tracking-[2px] text-zinc-500">
                        {products.length} Items
                    </span>}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-5">
                    {products.map((product) => (
                        <Link href={`/shopDetails/${product.id}`} key={product.id} className="group cursor-pointer flex flex-col">
                            <div className="relative w-full aspect-3/4 bg-zinc-100 overflow-hidden mb-4">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                            </div>
                            <div className="flex justify-between items-start">
                                <span className="uppercase tracking-[2px] text-[8px] md:text-[16px] text-black">
                                    {product.name}
                                </span>
                                <span className="text-[8px] md:text-[16px] text-black font-bold">
                                    {product.price}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

            </main>
        </div>
    );
}