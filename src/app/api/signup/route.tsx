import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash the password (never save plain text passwords!)
    const hashedPassword = await bcrypt.hash(password, 10)

    // Save to database
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    })

    return NextResponse.json({ message: "User created successfully", user: { id: user.id } }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}