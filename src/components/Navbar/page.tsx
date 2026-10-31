"use client"; // 👈 1. Required for useState and onClick

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-transparent text-black px-4 py-4 sm:px-6 sm:py-5 md:px-12 md:py-6 relative z-50">
      <div className="max-w-[1920px] mx-auto flex justify-between items-center gap-3">
        <Link href="/" className="uppercase font-bold tracking-[1px] sm:tracking-[2px] text-[14px] sm:text-[18px] shrink-0 hover:opacity-50 transition-opacity">
          before fame
        </Link>

        <div className="hidden md:flex gap-8 uppercase tracking-[1.4px] text-[14px]">
          <Link href="/shop" className="cursor-pointer hover:opacity-50 transition-opacity">shop</Link>
          <Link href="/about" className="cursor-pointer hover:opacity-50 transition-opacity">about</Link>
          <Link href="/contact" className="cursor-pointer hover:opacity-50 transition-opacity">contact us</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block uppercase tracking-[1.4px] text-[14px] cursor-pointer hover:opacity-50 transition-opacity">
            log in
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
          <Link href="/login" className="cursor-pointer hover:opacity-50" onClick={() => setMenuOpen(false)}>log in</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;