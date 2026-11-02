import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Optional: Clear old products so you don't get duplicates
    await prisma.product.deleteMany()

    // Use createMany to insert an array of products
    const newProducts = await prisma.product.createMany({
      data: [
        {
          name: "Test Tee",
          description: "A test product",
          price: 1500000,
          images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1000", 
            "https://images.unsplash.com/photo-1772757844633-0f1e20b8a199?q=80&w=1296&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
          ],
          category: "T-Shirts",
          sizes: ["M", "L"],
          stock: 10,
        },
        {
          name: "Heavyweight Hoodie",
          description: "Relaxed fit, dropped shoulders. Made for the freestyle thinker.",
          price: 4500000,
          images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1000",
            "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=1000",
            "https://images.unsplash.com/photo-1529374255404-311a2a4f7c4a?w=1000"
          ],
          category: "Hoodies",
          sizes: ["M", "L", "XL"],
          stock: 20,
        },
        {
          name: "Vintage Denim Jacket",
          description: "Washed out denim with a classic fit. Built to last a lifetime.",
          price: 6500000,
          images: [
            "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=1000",
            "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=1000",
            "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=1000",
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1000"
          ],
          category: "Jackets",
          sizes: ["S", "M", "L"],
          stock: 15,
        }
      ],
    })
    
    return NextResponse.json({ message: "Success", count: newProducts.count })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Failed", error }, { status: 500 })
  }
}