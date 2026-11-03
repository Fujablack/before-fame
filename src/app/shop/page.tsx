"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type Product = {
    id: string;
    name: string;
    price: number;
    images: string[];
};

export default function Shop() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // 2. Fetch the products from your database API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();

                // Check if data is actually an array before setting it
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error("API did not return an array:", data);
                    setProducts([]);
                }
            } catch (error) {
                console.error("Failed to fetch products", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center uppercase tracking-widest text-zinc-500">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black flex flex-col">
            <main className="flex-1 max-w-[1920px] mx-auto w-full px-4 sm:px-6 md:px-12 md:py-20">
                <div className="flex justify-between items-end mb-2">
                    <h1 className="text-[14px] md:text-[48px] uppercase tracking-widest text-black">
                        All Pieces
                    </h1>
                    {products.length === 1 ? (
                        <span className="text-[14px] uppercase tracking-[2px] text-zinc-500">
                            {products.length} Item
                        </span>
                    ) : (
                        <span className="text-[14px] uppercase tracking-[2px] text-zinc-500">
                            {products.length} Items
                        </span>
                    )}
                </div>

                {/* <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-5">
                    {products.map((product) => (
                        <Link href={`/shopDetails/${product.id}`} key={product.id} className="group cursor-pointer flex flex-col">
                            
                            <div className="relative w-full aspect-[3/4] bg-zinc-100 overflow-hidden mb-4">
                                {product.images?.[0] && (
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                )}
                            </div>
                            
                            <div className="flex justify-between items-start">
                                <span className="uppercase tracking-[1px] text-[10px] sm:text-[16px] text-[#111]">
                                    {product.name}
                                </span>
                                <span className="text-[8px] md:text-[16px] text-black font-bold">
                                    ₦{(product.price / 100).toLocaleString()}
                                </span>
                            </div>
                            
                        </Link>
                    ))}
                </div> */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-12">
                    {products.map((product) => (
                        // Wrap in Link to go to details page
                        <Link href={`/shopDetails/${product.id}`} key={product.id} className="group cursor-pointer mb-4">

                            {/* Image Container - Only show the FIRST image */}
                            <div className="relative w-full aspect-3/4 mb-1 overflow-hidden bg-zinc-100">
                                {product.images?.[0] && (
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                )}
                            </div>

                            {/* Product Details */}
                            <div className="flex flex-col justify-between items-start mt-1">
                                <span className="uppercase tracking-[1px] text-[10px] sm:text-[16px] text-[#111]">
                                    {product.name}
                                </span>
                                <span className="text-[12px] sm:text-[16px] font-normal text-[#000]">
                                    ₦{(product.price / 100).toLocaleString()}
                                </span>
                            </div>

                        </Link>
                    ))}
                </div>

                {/* Optional: Message if no products are found */}
                {products.length === 0 && (
                    <div className="text-center py-20 text-zinc-500 uppercase tracking-widest">
                        No products available yet.
                    </div>
                )}
            </main>
        </div>
    );
}