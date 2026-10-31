'use client'
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 1. Mock data (updated to have an array of images)
const products = [
    { 
        id: 1, 
        name: "Leather Overcoat", 
        price: "$99.00", 
        // Note: Make sure you actually have these files in your public folder!
        images: ["/images/1.jpg", "/images/fuja.jpg", "/images/2.jpg"], 
        description: "Considered cuts and modern silhouettes. A heavyweight overcoat tailored for the quiet moments." 
    },
    { 
        id: 2, 
        name: "Oversized T-Shirt", 
        price: "$22.00", 
        images: ["/images/4.jpg", "/images/99.jpg"], 
        description: "Relaxed fit, dropped shoulders. Made for the freestyle thinker." 
    },
    { 
        id: 3, 
        name: "The Hundred Hoody", 
        price: "$22.00", 
        images: ["/images/2.jpg", "/images/1.jpg", "/images/fuja.jpg",], 
        description: "Heavyweight fleece. Built for comfort, designed for the shadows." 
    },
];

const sizes = ['S', 'M', 'L', 'XL'];

function ShopDetails() {
    const params = useParams();
    const [selectedSize, setSelectedSize] = useState('M');
    
    // 2. State for the main image
    const [activeImage, setActiveImage] = useState(0);

    const product = products.find((p) => p.id === parseInt(params.id))

    if (!product) {
        return <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white text-black">
            <h1 className="text-[24px] uppercase tracking-widest mb-4">Product not found</h1>
            <Link href="/shop" className="underline hover:opacity-50">Return to shop</Link>
        </div>
    }

    return (
        <div className="min-h-screen bg-white text-black px-4 sm:px-6 md:px-12 py-12 md:py-24 max-w-[1920px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">

                {/* Left: Image Gallery */}
                <div className="flex flex-col gap-4">
                    {/* Main Image */}
                    <div className="relative w-full aspect-[3/4] bg-zinc-100">
                        <Image
                            src={product.images[activeImage]} // <-- Uses the state to pick the image
                            alt={product.name}
                            fill
                            className="object-cover object-top transition-opacity duration-300"
                            priority
                        />
                    </div>

                    {/* Thumbnail Images */}
                    <div className="flex gap-4">
                        {product.images.map((img, index) => (
                            <button 
                                key={index}
                                onClick={() => setActiveImage(index)} // <-- Updates the main image on click
                                className={`relative w-20 h-24 bg-zinc-100 overflow-hidden border-2 transition-colors ${
                                    activeImage === index ? 'border-black' : 'border-transparent hover:border-zinc-300'
                                }`}
                            >
                                <Image
                                    src={img}
                                    alt={`${product.name} thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Details */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-[24px] md:text-[48px] font-bold uppercase tracking-widest mb-2">
                        {product.name}
                    </h1>
                    <p className="text-[20px] text-zinc-500 mb-8">{product.price}</p>

                    <p className="text-[14px] tracking-[2px] uppercase leading-relaxed text-zinc-800 mb-10 max-w-md">
                        {product.description}
                    </p>

                    {/* Size Selector */}
                    <div className="mb-10">
                        <span className="text-[12px] uppercase tracking-[2px] text-zinc-500 mb-4 block">Select Size</span>
                        <div className="flex gap-4">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-12 h-12 flex items-center justify-center border text-[14px] transition-colors ${selectedSize === size
                                        ? 'border-black bg-black text-white'
                                        : 'border-zinc-300 hover:border-black'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button className="w-full py-4 bg-black text-white uppercase tracking-[2px] text-[14px] hover:bg-zinc-800 transition-colors">
                        Add to Cart
                    </button>

                    <div className="mt-8 text-[12px] uppercase tracking-[1px] text-zinc-400">
                        <p>Free shipping on orders above $100</p>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default ShopDetails;