"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react"
import { useState } from "react";
// 1. Import your cart hook and an icon (using react-icons here)
import { useCart } from "@/context/CartContext";
import { FaShoppingCart } from "react-icons/fa"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession()
  
  // 2. Get the cart from context and calculate total items
  const { cart } = useCart();
  const totalItems = cart.length; 

  const handleSignOut = () => {
    signOut();
    setMenuOpen(false);
  }

  return (
    <header className="w-full bg-transparent text-black px-4 py-4 sm:px-6 sm:py-5 md:px-12 md:py-6 relative z-50">
      <div className="max-w-[1920px] mx-auto flex justify-between items-center gap-3">
        <Link href="/" className="shrink-0 hover:opacity-50 transition-opacity flex items-center">
          <div className="relative w-24 h-10 sm:w-32 sm:h-12">
            <Image
              src="/favicon.jpg"
              alt="Before Fame Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        <div className="hidden md:flex gap-8 uppercase tracking-[1.4px] text-[14px]">
          <Link href="/shop" className="cursor-pointer hover:opacity-50 transition-opacity">shop</Link>
          <Link href="/about" className="cursor-pointer hover:opacity-50 transition-opacity">about</Link>
          <Link href="/contact" className="cursor-pointer hover:opacity-50 transition-opacity">contact us</Link>
        </div>

        <div className="flex items-center gap-5">
          {status === "unauthenticated" ? (
            <Link href="/login" className="md:block uppercase tracking-[1.4px] text-[14px] cursor-pointer hover:opacity-50 transition-opacity">
              log in
            </Link>
          ) : (
            <p className="md:block tracking-[1.4px] text-[14px] cursor-pointer hover:opacity-50 transition-opacity">
              Hey, {session?.user?.name || "User"}!
            </p>
          )}

          {/* 3. The Cart Icon with the Badge */}
          <Link href="/cart" className="relative cursor-pointer hover:opacity-50 transition-opacity flex items-center">
            <FaShoppingCart className="text-xl md:text-2xl" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center gap-[5px] p-2"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-0.5 bg-black transition-transform ${menuOpen ? "translate-y-1.75 rotate-45" : ""}`} />
            <span className={`block w-6 h-0.5 bg-black transition-transform ${menuOpen ? "-translate-y-1.75 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md px-6 py-6 flex flex-col gap-6 uppercase tracking-[1.4px] text-[13px] md:hidden">
          <Link href="/shop" className="cursor-pointer hover:opacity-50" onClick={() => setMenuOpen(false)}>shop</Link>
          <Link href="/about" className="cursor-pointer hover:opacity-50" onClick={() => setMenuOpen(false)}>about</Link>
          <Link href="/contact" className="cursor-pointer hover:opacity-50" onClick={() => setMenuOpen(false)}>contact us</Link>
          {status === 'unauthenticated' ? (
            <Link href="/login" className="cursor-pointer hover:opacity-50" onClick={() => setMenuOpen(false)}>log in</Link>
          ) : (
            <Link href="" className="cursor-pointer hover:opacity-50" onClick={handleSignOut}>Sign out</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;