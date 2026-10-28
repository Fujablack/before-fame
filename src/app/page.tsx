"use client";
import Image from "next/image";

const genders = [
  {
    id: 1,
    name: "Women",
    image: "/images/8.jpg",
  },
  {
    id: 2,
    name: "Men",
    image: "/images/men1.jpg",
  },
];
const products = [
  {
    id: 1,
    name: "Leather overcoat",
    price: "$99.00",
    image: "/images/1.jpg",
  },
  {
    id: 2,
    name: "Oversized t-shirt",
    price: "$22.00",
    image: "/images/4.jpg",
  },
  {
    id: 3,
    name: "The hundred hoody",
    price: "$22.00",
    image: "/images/2.jpg",
  },
];

export default function Home() {
  return (
    <div className="max-w-[1920px] mx-auto">
      <main>
        {/* Make sure to add your background image URL here later */}
        <div className="bg-[url(/)] bg-cover bg-center bg-no-repeat w-full h-100">
        </div>

        <section className="flex gap-4 bg-black">
          {genders.map((gender) => (
            <div key={gender.id} className="relative w-1/2 h-100">
              <Image
                src={gender.image}
                alt={gender.name}
                fill
                 className="object-contain"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h2 className="uppercase text-white text-[90px] font-hero tracking-[5.4px]">{gender.name}</h2>
                <button
                  onClick={() => { }}
                  className="group py-2.5 px-12.5 bg-white hover:bg-black flex justify-center items-center transition-colors"
                >
                  <span className="uppercase text-[14px] text-[#111] group-hover:text-white tracking-[1.4px]">
                    shop now
                  </span>
                </button>
              </div>
            </div>
          ))}
        </section>

        <section className="">
          <div className="flex items-center justify-between gap-4 md:gap-8">

            <button
              onClick={() => { }}
              className="p-2 hover:opacity-50 transition-opacity"
              aria-label="Previous items"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="92" height="67" viewBox="0 0 92 67" fill="none">
                <path d="M33.1361 65.6987L1.39771 33.1987L33.1361 0.69873M1.39771 33.1987H91.3977" strokeWidth="2" stroke="#BDBDBD" />
              </svg>
            </button>

            <div className="w-full max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-[#111] uppercase tracking-[6.84px] text-[38px]">
                  New arrival items
                </h3>
                <p className="text-[#111] text-[14px] uppercase tracking-[1.4px] cursor-pointer hover:underline">
                  shop all
                </p>
              </div>

              <div className="w-full flex justify-between gap-6">
                {products.map((product) => (
                  <div key={product.id} className="w-116.5 flex flex-col">

                    <div className="relative w-full h-150 mb-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="466px"
                      />
                    </div>

                    <div className="flex justify-between">
                      <span className="uppercase tracking-[2px] text-[20px] font-sans">
                        {product.name}
                      </span>
                      <span className="text-[20px] font-bold font-sans">
                        {product.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => { }}
              className="p-2 hover:opacity-50 transition-opacity"
              aria-label="Next items"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="92" height="67" viewBox="0 0 92 67" fill="none">
                <path d="M58.2616 65.6987L90 33.1987L58.2616 0.69873M90 33.1987H0" strokeWidth="2" stroke="#111111" />
              </svg>
            </button>

          </div>
        </section>
      </main>
    </div>
  );
}