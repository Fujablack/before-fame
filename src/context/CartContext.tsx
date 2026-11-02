"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type CartItem = {
  id: string
  name: string
  price: number
  image: string
  size: string
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string, size: string) => void
  updateQuantity: (id: string, size: string, amount: number) => void
  cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("beforefame_cart")
    if (savedCart) setCart(JSON.parse(savedCart))
  }, [])

  // Save to local storage whenever cart changes
  useEffect(() => {
    localStorage.setItem("beforefame_cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.size === item.size)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.size === item.size ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (id: string, size: string) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)))
  }

  const updateQuantity = (id: string, size: string, amount: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === id && item.size === size) {
          const newQty = item.quantity + amount
          return { ...item, quantity: newQty < 1 ? 1 : newQty } // Prevents going below 1
        }
        return item
      })
    })
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}