'use client'
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from "@/context/CartContext"
import SizeGuide from '@/components/SizeGuard.tsx/page';

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
    const [selectedSize, setSelectedSize] = useState('');
    const [activeImage, setActiveImage] = useState(0);

    // Cart state
    const { cart, addToCart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const [open, setOpen] = useState(false);

    // Size Guide state
    const [isGuideOpen, setIsGuideOpen] = useState(false);

    // NEW: Email Modal state
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [email, setEmail] = useState("");

    const proceedToPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsEmailModalOpen(false);

        try {
            const res = await fetch("/api/paystack/initialize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, amount: Math.round(cartTotal) }),
            });

            const data = await res.json();

            if (data.access_code) {
                const { default: PaystackPop } = await import('@paystack/inline-js');

                const popup = new PaystackPop();
                popup.resumeTransaction(data.access_code, {
                    onSuccess: (transaction: any) => {
                        window.location.href = `/payment/success?reference=${transaction.reference}`;
                    },
                    onCancel: () => alert("Payment window closed."),
                });
            } else {
                alert(data.error || "Failed to start payment");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
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
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-24">

                {/* Left: Image Gallery */}
                <div className="flex flex-col gap-4">
                    <div className="relative w-full aspect-[3/4] bg-zinc-100">
                        <Image
                            src={product.images[activeImage]}
                            alt={product.name}
                            fill
                            className="object-cover object-top transition-opacity duration-300"
                            priority
                        />
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {product.images.map((img, index) => (
                            <button
                                key={img}
                                onClick={() => setActiveImage(index)}
                                className={`relative w-20 h-24 flex-shrink-0 bg-zinc-100 overflow-hidden border-2 transition-colors ${activeImage === index ? 'border-black' : 'border-transparent hover:border-zinc-300'}`}
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
                    <h1 className="text-[14px] md:text-[36px] font-bold uppercase tracking-widest mb-2">
                        {product.name}
                    </h1>
                    <p className="text-[14px] text-zinc-500 mb-3">
                        ₦{(product.price / 100).toLocaleString()}
                    </p>

                    {/* Size Selector with Size Guide button */}
                    <div className="mb-5">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[12px] uppercase tracking-[2px] text-zinc-500 block">size: {selectedSize}</span>
                            <button
                                onClick={() => setIsGuideOpen(true)}
                                className="text-[12px] underline text-zinc-500 hover:text-black"
                            >
                                Size Guide
                            </button>
                        </div>
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
                    <button
                        onClick={() => {
                            if (!selectedSize) return alert("Please select a size first!");
                            addToCart({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.images[0],
                                size: selectedSize,
                                quantity: 1
                            });
                            setOpen(true);
                        }}
                        className="w-full py-4 bg-black text-white uppercase tracking-[2px] text-[14px] hover:bg-zinc-800 transition-colors"
                    >
                        Add to Cart
                    </button>

                    {/* Buy Now Button */}
                    <button
                        onClick={() => {
                            if (!selectedSize) return alert("Please select a size first!");
                            addToCart({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.images[0],
                                size: selectedSize,
                                quantity: 1
                            });
                            setOpen(true); // Just open the drawer so they can click "Pay Now"
                        }}
                        className="w-full py-4 bg-black text-white uppercase tracking-[2px] text-[14px] hover:bg-zinc-800 transition-colors mt-5"
                    >
                        Buy Now
                    </button>
                </div>
            </div>

            {/* Size Guide Modal */}
            <SizeGuide isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

            {/* Cart Drawer */}
            {open && (
                <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />
            )}

            <div className={`fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white z-50 transition-transform duration-300 flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-bold uppercase tracking-widest">Your Cart</h2>
                    <button onClick={() => setOpen(false)} className="text-2xl font-bold">&times;</button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                    {cart.length === 0 ? (
                        <p className="text-zinc-500 text-center mt-10">Your cart is empty.</p>
                    ) : (
                        cart.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b pb-4">
                                <div className="relative w-20 h-24 bg-zinc-100 flex-shrink-0">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>

                                <div className="flex flex-col justify-between flex-1">
                                    <div>
                                        <h3 className="font-bold text-sm uppercase">{item.name}</h3>
                                        <p className="text-zinc-500 text-xs mb-2">Size: {item.size}</p>

                                        {/* Quantity Buttons */}
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, -1)}
                                                className="w-6 h-6 border flex items-center justify-center hover:bg-zinc-100"
                                            >
                                                -
                                            </button>
                                            <span className="text-sm font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, 1)}
                                                className="w-6 h-6 border flex items-center justify-center hover:bg-zinc-100"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mt-2">
                                        <p className="font-semibold text-sm">₦{((item.price * item.quantity) / 100).toLocaleString()}</p>
                                        <button onClick={() => removeFromCart(item.id, item.size)} className="text-red-500 text-xs hover:underline">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-6 border-t bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold uppercase">Total</span>
                            <span className="font-bold">₦{(cartTotal / 100).toLocaleString()}</span>
                        </div>
                        <button
                            onClick={() => setIsEmailModalOpen(true)} // Open the custom modal
                            className="w-full bg-black text-white py-4 uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                        >
                            Pay Now
                        </button>
                    </div>
                )}
            </div>

            {/* NEW: Email Modal */}
            {isEmailModalOpen && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4"
                    onClick={() => setIsEmailModalOpen(false)}
                >
                    <div
                        className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold uppercase tracking-widest mb-4">Checkout</h2>
                        <p className="text-sm text-zinc-500 mb-6">Please enter your email address to receive your receipt.</p>

                        <form onSubmit={proceedToPayment} className="flex flex-col gap-4">
                            <input
                                type="email"
                                required
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-zinc-300 p-3 rounded focus:outline-none focus:border-black"
                            />
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-3 uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                            >
                                Proceed to Pay
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div >
    );
}

export default ShopDetails;