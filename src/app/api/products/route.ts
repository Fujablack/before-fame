import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Fetch all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

// CREATE a new product
export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Basic validation
    if (!body.name || !body.price || !body.images || body.images.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description || "",
        price: Number(body.price), // Ensure it's a number
        images: body.images,       // Array of URLs
        category: body.category || "Uncategorized",
        sizes: body.sizes || [],
        stock: Number(body.stock) || 0,
      },
    })

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error("POST Error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}