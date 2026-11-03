"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react"; // Added useRef
import Link from "next/link";

// 1. Add this type at the top of the file (outside the component)
type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  sizes: string[];
  stock: number;
}

const genders = [
  {
    id: 1,
    name: "Women",
    image: "/images/98.jpg",
  },
  {
    id: 2,
    name: "Men",
    image: "/images/99.jpg",
  },
];

const Home = () => {
  const [products, setProducts] = useState<Product[]>([])
  
  // Refs for the videos
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const coreVideoRef = useRef<HTMLVideoElement>(null);

  const fetchGenderPicture = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      }
    } catch (error) {
      console.log(error, 'Failed to fetch pictures')
    }
  }

  useEffect(() => {
    fetchGenderPicture()

    // Force videos to play on mount (fixes React muted bug)
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = true;
      heroVideoRef.current.play().catch(e => console.log("Hero video blocked:", e));
    }
    if (coreVideoRef.current) {
      coreVideoRef.current.muted = true;
      coreVideoRef.current.play().catch(e => console.log("Core video blocked:", e));
    }
  }, []);


  return (
    <div className="max-w-[1920px] mx-auto">
      <main>
        <section className="relative w-full h-[85vh] sm:h-[75vh] max-h-[800px] overflow-hidden">
          {/* 1. The Video Background with Ref */}
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://media1.calvinklein.com/images/20261027/Top_Gifts/videos/TG_Abi.mp4" type="video/mp4" />
          </video>

          {/* 2. Dark Overlay */}
          <div className="absolute inset-0 bg-black/30 sm:bg-gradient-to-r sm:from-black/60 sm:to-transparent"></div>

          {/* 3. The Text Content */}
          <div className="absolute inset-0 flex flex-col justify-end pb-[12%] sm:justify-center sm:pb-0 px-5 sm:px-8 md:pl-16 lg:pl-[11.25%] z-10">
            <div className="flex flex-col items-start max-w-xl">
              <span className="text-[clamp(42px,9vw,122px)] leading-[0.95] font-hero text-white uppercase text-left mb-6 drop-shadow-lg">
                before fame.
              </span>

              <Link href={'/shop'}>
                <button className="group py-3 px-10 bg-white hover:bg-black flex justify-center items-center transition-colors w-fit">
                  <span className="uppercase text-[12px] sm:text-[14px] text-[#111] group-hover:text-white tracking-[1.4px]">
                    shop
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section className="relative flex w-full bg-black">
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-5">
            <h2 className="uppercase text-white text-[32px] sm:text-[40px] md:text-[50px] leading-tight tracking-[2px] text-center mb-3 sm:mb-4">
              Winter
              <br />
              Sweaters
            </h2>

            <span className="text-white text-center text-[12px] sm:text-sm md:text-base max-w-md mb-5 sm:mb-8">
              Considered cuts and modern silhouettes, tailored to perfection.
            </span>

            <div className="flex gap-6 sm:gap-12 pointer-events-auto">
              {/* Changed to Link for better SEO and speed */}
              <Link
                href="/shop"
                className="uppercase text-white tracking-[0.8px] sm:tracking-[1.4px] text-[11px] sm:text-[14px] pb-1 border-b border-white hover:text-gray-300 hover:border-gray-300 transition-colors"
              >
                Shop Women
              </Link>

              <Link
                href="/shop"
                className="uppercase text-white tracking-[0.8px] sm:tracking-[1.4px] text-[11px] sm:text-[14px] pb-1 border-b border-white hover:text-gray-300 hover:border-gray-300 transition-colors"
              >
                Shop Men
              </Link>
            </div>
          </div>

          {genders.map((gender) => (
            <div key={gender.id} className="relative w-1/2 h-[420px] sm:h-[600px] md:h-[800px] lg:h-[1000px] xl:h-310">
              <Image
                src={gender.image}
                alt={gender.name}
                loading="eager"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 50vw"
              />
            </div>
          ))}
        </section>

        {/* NEW PRODUCT GRID SECTION */}
        <section className="w-full bg-white px-5 sm:px-8 md:px-16 py-16 md:py-24">
          <div >
            {/* Section Header */}
            <div className="flex justify-between items-center mb-5 md:mb-16">
              <h3 className="text-black uppercase tracking-[3px] sm:tracking-[3.84px] text-[14px] sm:text-24px]">
                New Arrivals
              </h3>
              <Link href="/shop" className="text-[#111] text-[12px] sm:text-[14px] uppercase tracking-[1.4px] hover:underline ">
                Shop All
              </Link>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-12">
              {products.slice(0, 4).map((product) => (
                <Link href={`/shopDetails/${product.id}`} key={product.id} className="group cursor-pointer mb-4">
                  <div className="relative w-full aspect-[3/4] mb-1 overflow-hidden bg-zinc-100">
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
          </div>
        </section>

        <section className="relative flex w-full h-112.5 sm:h-150 md:h-200 lg:h-305 bg-black">
          {/* Second Video with Ref */}
          <video
            ref={coreVideoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://media1.calvinklein.com/images/20260630/about_us_250/Videos/Reach.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 pointer-events-none">
            <h2 className="uppercase text-white text-[64px] sm:text-[80px] md:text-[100px] font-hero tracking-[3px] sm:tracking-[5px] mb-5 sm:mb-8 drop-shadow-lg">
              core
            </h2>
            <Link
              href="/shop"
              className="pointer-events-auto group py-3 px-8 sm:px-10 bg-white hover:bg-black flex justify-center items-center transition-colors"
            >
              <span className="uppercase text-[12px] sm:text-[14px] text-[#111] group-hover:text-white tracking-[1.4px]">
                Shop Now
              </span>
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}

export default Home;