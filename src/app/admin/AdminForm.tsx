"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "T-Shirts",
    stock: "10",
    sizes: "M, L, XL",
  })
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 1. Upload the images first
      let uploadedImageUrls: string[] = []
      
      if (selectedFiles.length > 0) {
        const fileData = new FormData()
        selectedFiles.forEach((file) => {
          fileData.append("file", file)
        })

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: fileData,
        })

        if (!uploadRes.ok) {
          const errorData = await uploadRes.json()
          throw new Error(errorData.error || "Image upload failed")
        }
        
        const uploadData = await uploadRes.json()
        uploadedImageUrls = uploadData.urls
      }

      // 2. Create the product with the returned URLs
      const payload = {
        ...formData,
        price: parseFloat(formData.price) * 100, // Convert to Kobo
        stock: parseInt(formData.stock),
        sizes: formData.sizes.split(",").map((s) => s.trim()),
        images: uploadedImageUrls, 
      }

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        alert("Product added successfully!")
        router.push("/")
        router.refresh()
      } else {
        alert("Failed to add product.")
      }
    } catch (error: any) {
      console.error(error)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-white shadow rounded-lg text-black">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="text" placeholder="Product Name" required
          className="border p-2 rounded"
          value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        
        <input 
          type="number" placeholder="Price (in Naira)" required
          className="border p-2 rounded"
          value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
        />

        <textarea 
          placeholder="Description" required
          className="border p-2 rounded"
          value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
        />

        <input 
          type="text" placeholder="Sizes (comma separated)" 
          className="border p-2 rounded"
          value={formData.sizes} onChange={(e) => setFormData({...formData, sizes: e.target.value})}
        />

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">Upload Images</label>
          <input 
            type="file" 
            multiple 
            accept="image/*"
            required
            className="border p-2 rounded"
            onChange={(e) => {
              if (e.target.files) {
                setSelectedFiles(Array.from(e.target.files))
              }
            }}
          />
          <p className="text-xs text-gray-500">
            You can select multiple images at once.
          </p>
        </div>

        <button 
          type="submit" disabled={loading}
          className="bg-black text-white p-3 rounded mt-4 hover:bg-zinc-800 disabled:opacity-50"
        >
          {loading ? "Uploading & Saving..." : "Save Product"}
        </button>
      </form>
    </div>
  )
}