"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from "next/link";

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

// const products = [
//   {
//     id: 1,
//     name: "Leather overcoat",
//     price: "$99.00",
//     image: "/images/1.jpg",
//   },
//   {
//     id: 2,
//     name: "Oversized t-shirt",
//     price: "$22.00",
//     image: "/images/4.jpg",
//   },
//   {
//     id: 3,
//     name: "The hundred hoody",
//     price: "$22.00",
//     image: "/images/2.jpg",
//   },
// ];

const fujaImages = [
  "/images/fuja.jpg",
  "/images/042.webp",
  "/images/men16.jpg",
  // "/images/fuja-4.jpg",
];

const Home = () => {
  // const [emblaRef] = useEmblaCarousel({ loop: true }, [
  //   Autoplay({ delay: 3000, stopOnInteraction: false })
  // ]);
  const [products, setProducts] = useState([]);

  const fetchGenderPictures = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
        console.log("===========", data)
      }
    } catch (error) {
      console.log(error, 'Failed to fetch pictures')
    }
  }

  useEffect(() => {
    fetchGenderPictures()
  }, []);


  return (
    <div className="max-w-[1920px] mx-auto">
      <main>
        <section className="relative bg-[url(/images/bg2.jpg)] bg-cover bg-center bg-no-repeat w-full min-h-137.5 h-[75vh] max-h-200.5">
          <div className="absolute inset-x-0 bottom-[12%] sm:bottom-[14%] flex flex-col items-center sm:items-start px-5 sm:px-8 md:pl-16 lg:pl-[11.25%]">
            <span className="text-[clamp(42px,9vw,122px)] leading-[0.95] font-hero text-white uppercase max-w-full sm:max-w-163.5 text-center sm:text-left">
              before fame.
            </span>
            <button
              className="group mt-5 sm:mt-6 py-2.5 px-8 sm:px-12.5 bg-white hover:bg-black flex justify-center items-center transition-colors w-fit max-w-60.75"
            >
              <span className="uppercase text-[12px] sm:text-[14px] text-[#111] group-hover:text-white tracking-[1.4px]">
                <Link href={'/shop'}>shop</Link>
              </span>
            </button>
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
              <button
                onClick={() => { navigation.navigate('/shop') }}
                className="uppercase text-white tracking-[0.8px] sm:tracking-[1.4px] text-[11px] sm:text-[14px] pb-1 border-b border-white hover:text-gray-300 hover:border-gray-300 transition-colors"
              >
                Shop Women
              </button>

              <button
                onClick={() => { navigation.navigate('/shop') }}
                className="uppercase text-white tracking-[0.8px] sm:tracking-[1.4px] text-[11px] sm:text-[14px] pb-1 border-b border-white hover:text-gray-300 hover:border-gray-300 transition-colors"
              >
                Shop Men
              </button>
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
          <div className="max-w-[1920px] mx-auto">

            {/* Section Header */}
            <div className="flex justify-between items-center mb-10 md:mb-16">
              <h3 className="text-[#111] uppercase tracking-[3px] sm:tracking-[3.84px] text-[14px] sm:text-24px]">
                New Arrivals
              </h3>
              <Link href="/shop" className="text-[#111] text-[12px] sm:text-[14px] uppercase tracking-[1.4px] hover:underline ">
                Shop All
              </Link>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {products.map((product) => (
                // Wrap in Link to go to details page
                <Link href={`/shopDetails/${product.id}`} key={product.id} className="group cursor-pointer">

                  {/* Image Container - Only show the FIRST image */}
                  <div className="relative w-full aspect-[3/4] mb-4 overflow-hidden bg-zinc-100">
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
                  <div className="flex justify-between items-start mt-2">
                    <span className="uppercase tracking-[1px] text-[14px] sm:text-[16px] text-[#111]">
                      {product.name}
                    </span>
                    <span className="text-[14px] sm:text-[16px] font-bold text-[#111]">
                      ₦{(product.price / 100).toLocaleString()}
                    </span>
                  </div>

                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* <section className="relative flex w-full h-[450px] sm:h-[600px] md:h-[800px] lg:h-305 bg-black">

          <div className="absolute inset-0 overflow-hidden w-full h-full" ref={emblaRef}>
            <div className="flex h-full">
              {fujaImages.map((src, index) => (
                <div key={index} className="relative flex-[0_0_100%] h-full">
                  <Image
                    src={src}
                    alt={`Fuja ${index + 1}`}
                    fill
                    className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                    priority={index === 0}
                    sizes="100vw"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 pointer-events-none">
            <h2 className="uppercase text-white text-[64px] sm:text-[80px] md:text-[100px] font-hero tracking-[3px] sm:tracking-[5px] mb-5 sm:mb-8 drop-shadow-lg">
              UNLEARNED
            </h2>
            <button
              onClick={() => { }}
              className="pointer-events-auto group py-3 px-8 sm:px-10 bg-white hover:bg-black flex justify-center items-center transition-colors"
            >
              <span className="uppercase text-[12px] sm:text-[14px] text-[#111] group-hover:text-white tracking-[1.4px]">
                Shop Now
              </span>
            </button>
          </div>
        </section> */}

        <section className="relative flex w-full h-[450px] sm:h-[600px] md:h-[800px] lg:h-305 bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/fuja.jpg"
          >
            <source src="https://media1.calvinklein.com/images/20260630/about_us_250/Videos/Reach.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 pointer-events-none">
            <h2 className="uppercase text-white text-[64px] sm:text-[80px] md:text-[100px] font-hero tracking-[3px] sm:tracking-[5px] mb-5 sm:mb-8 drop-shadow-lg">
              core
            </h2>
            <button
              onClick={() => { }}
              className="pointer-events-auto group py-3 px-8 sm:px-10 bg-white hover:bg-black flex justify-center items-center transition-colors"
            >
              <span className="uppercase text-[12px] sm:text-[14px] text-[#111] group-hover:text-white tracking-[1.4px]">
                Shop Now
              </span>
            </button>
          </div>
        </section>

        {/* <Footer /> */}

      </main>
    </div>
  );
}

export default Home;