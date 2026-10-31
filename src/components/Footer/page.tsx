import Link from "next/link";

const Footer = () => { // 👈 Changed to capital F
  return (
    <footer className="bg-black text-zinc-500  px-6 py-16 md:px-12 border-t border-zinc-800">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex flex-col gap-4">
          <span className="uppercase font-bold tracking-[2px] text-[14px]">
            before fame
          </span>
          <p className="text-zinc-500  uppercase tracking-[2px] text-[8px] md:text-[16px] max-w-xs leading-relaxed">
            Before the lights, we were silent. Considered cuts and modern silhouettes, tailored to perfection.
          </p>
        </div>

        <div className="flex gap-16 md:gap-24">
          <div className="flex flex-col gap-4 text-sm uppercase tracking-[1.4px]">
            <span className="text-zinc-500 mb-2 ">Explore</span>
            <Link href="/shop" className="hover:opacity-50 transition-opacity">Shop</Link>
            <Link href="/about" className="hover:opacity-50 transition-opacity">About</Link>
            <Link href="/contact" className="hover:opacity-50 transition-opacity">Contact Us</Link>
          </div>

          <div className="flex flex-col gap-4 text-sm uppercase tracking-[1.4px]">
            <span className="text-zinc-500 mb-2 ">Socials</span>

            <a
              href="https://www.instagram.com/beforefamewear?xtok=dW0xMm84ZmN6enAx&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              className="flex \ items-center gap-3 hover:opacity-50 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Instagram
            </a>

            <a
              href="https://x.com/beforefamewear?s=11"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:opacity-50 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.255h2.039L6.486 3.217H4.298l13.312 17.038Z" />
              </svg>
              X (Twitter)
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto mt-16 pt-8 border-t border-zinc-800 text-xs text-zinc-600 uppercase tracking-widest flex justify-between">
        <span>© {new Date().getFullYear()} Before Fame. All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;