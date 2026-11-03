"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/context/CartContext"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart()
  
  // 1. State for the email modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState("")

  const proceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsModalOpen(false) // Close the email modal

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

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white text-black">
        <h1 className="text-[24px] uppercase tracking-widest mb-4">Your cart is empty</h1>
        <Link href="/shop" className="underline hover:opacity-50">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-6 md:px-12 py-12 md:py-24 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold uppercase tracking-widest mb-8">Your Cart</h1>

      <div className="flex flex-col gap-6">
        {cart.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b pb-6">
            <div className="relative w-24 h-32 bg-zinc-100 flex-shrink-0">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>

            <div className="flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-bold text-sm sm:text-base uppercase">{item.name}</h3>
                <p className="text-zinc-500 text-xs sm:text-sm mb-2">Size: {item.size}</p>

                <div className="flex items-center gap-3">
                  <button onClick={() => updateQuantity(item.id, item.size, -1)} className="w-6 h-6 border flex items-center justify-center hover:bg-zinc-100">-</button>
                  <span className="text-sm font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.size, 1)} className="w-6 h-6 border flex items-center justify-center hover:bg-zinc-100">+</button>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <p className="font-semibold text-sm sm:text-base">₦{((item.price * item.quantity) / 100).toLocaleString()}</p>
                <button onClick={() => removeFromCart(item.id, item.size)} className="text-red-500 text-xs sm:text-sm hover:underline">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-6">
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold uppercase">Total</span>
          <span className="font-bold text-xl">₦{(cartTotal / 100).toLocaleString()}</span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)} // 2. Open modal instead of prompt
          className="w-full bg-black text-white py-4 uppercase tracking-widest hover:bg-zinc-800 transition-colors"
        >
          Pay Now
        </button>
      </div>

      {/* 3. The Custom Email Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setIsModalOpen(false)} // Click outside to close
        >
          <div 
            className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing it
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
    </div>
  )
}