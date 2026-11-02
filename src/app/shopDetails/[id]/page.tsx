'use client'
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 1. Define the type for your DB product
type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  sizes: string[];
};

function ShopDetails() {
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('M');
    const [activeImage, setActiveImage] = useState(0);

    // 2. Fetch the specific product from your backend
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Fetch all products and find the one with the matching ID
                // (Or create a specific endpoint: /api/products/${params.id})
                const res = await fetch('/api/products');
                const data = await res.json();
                const foundProduct = data.find((p: Product) => p.id === params.id);
                setProduct(foundProduct);
            } catch (error) {
                console.error("Failed to fetch product", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [params.id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    if (!product) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white text-black">
                <h1 className="text-[24px] uppercase tracking-widest mb-4">Product not found</h1>
                <Link href="/shop" className="underline hover:opacity-50">Return to shop</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black px-4 sm:px-6 md:px-12 py-12 md:py-24 max-w-[1920px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">

                {/* Left: Image Gallery */}
                <div className="flex flex-col gap-4">
                    {/* Main Image */}
                    <div className="relative w-full aspect-[3/4] bg-zinc-100">
                        <Image
                            src={product.images[activeImage]} 
                            alt={product.name}
                            fill
                            className="object-cover object-top transition-opacity duration-300"
                            priority
                        />
                    </div>

                    {/* Thumbnail Images */}
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {product.images.map((img, index) => (
                            <button 
                                key={img}
                                onClick={() => setActiveImage(index)} 
                                className={`relative w-20 h-24 flex-shrink-0 bg-zinc-100 overflow-hidden border-2 transition-colors ${
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
                    <p className="text-[20px] text-zinc-500 mb-8">
                        ₦{(product.price / 100).toLocaleString()}
                    </p>

                    <p className="text-[14px] tracking-[2px] uppercase leading-relaxed text-zinc-800 mb-10 max-w-md">
                        {product.description}
                    </p>

                    {/* Size Selector (Using DB sizes) */}
                    <div className="mb-10">
                        <span className="text-[12px] uppercase tracking-[2px] text-zinc-500 mb-4 block">Select Size</span>
                        <div className="flex gap-4">
                            {product.sizes.map((size) => (
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
                        <p>Free shipping on orders above ₦100,000</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ShopDetails;