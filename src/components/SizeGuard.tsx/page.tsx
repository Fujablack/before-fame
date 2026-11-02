"use client"

import { useState } from "react"

export default function SizeGuide({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [tab, setTab] = useState<"tops" | "bottoms">("tops")

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} />

      {/* Modal Panel */}
      <div className={`fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white z-[70] p-6 shadow-2xl overflow-y-auto transition-transform duration-300`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold uppercase tracking-widest">Size Guide</h2>
          <button onClick={onClose} className="text-3xl font-light">&times;</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button 
            onClick={() => setTab("tops")} 
            className={`flex-1 pb-2 text-sm font-semibold uppercase ${tab === "tops" ? "border-b-2 border-black text-black" : "text-zinc-400"}`}
          >
            Tops
          </button>
          <button 
            onClick={() => setTab("bottoms")} 
            className={`flex-1 pb-2 text-sm font-semibold uppercase ${tab === "bottoms" ? "border-b-2 border-black text-black" : "text-zinc-400"}`}
          >
            Bottoms
          </button>
        </div>

        <div className="overflow-x-auto">
          {tab === "tops" ? (
            <div className="flex flex-col gap-8">
              {/* Tops Table */}
              <div>
                <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-zinc-600">Product Details (cm)</h3>
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="bg-zinc-100 uppercase text-xs">
                    <tr>
                      <th className="p-3">Size</th>
                      <th className="p-3">UK</th>
                      <th className="p-3">Shoulder</th>
                      <th className="p-3">Chest</th>
                      <th className="p-3">Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="p-3 font-semibold">S</td><td className="p-3">36</td><td className="p-3">48</td><td className="p-3">114</td><td className="p-3">70</td></tr>
                    <tr className="border-b"><td className="p-3 font-semibold">M</td><td className="p-3">38</td><td className="p-3">50</td><td className="p-3">118</td><td className="p-3">72</td></tr>
                    <tr className="border-b"><td className="p-3 font-semibold">L</td><td className="p-3">40</td><td className="p-3">52</td><td className="p-3">123</td><td className="p-3">74</td></tr>
                    <tr className="border-b"><td className="p-3 font-semibold">XL</td><td className="p-3">42</td><td className="p-3">54</td><td className="p-3">128</td><td className="p-3">76</td></tr>
                    <tr className="border-b"><td className="p-3 font-semibold">XXL</td><td className="p-3">44</td><td className="p-3">56</td><td className="p-3">133</td><td className="p-3">78</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Body Measurements Table */}
              <div>
                <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-zinc-600">Body Measurements (cm)</h3>
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="bg-zinc-100 uppercase text-xs">
                    <tr>
                      <th className="p-3">Size</th>
                      <th className="p-3">UK</th>
                      <th className="p-3">Bust</th>
                      <th className="p-3">Waist</th>
                      <th className="p-3">Height</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="p-3 font-semibold">S</td><td className="p-3">36</td><td className="p-3">92-96</td><td className="p-3">78-82</td><td className="p-3">170-175</td></tr>
                    <tr className="border-b"><td className="p-3 font-semibold">M</td><td className="p-3">38</td><td className="p-3">96-100</td><td className="p-3">82-86</td><td className="p-3">175-180</td></tr>
                    <tr className="border-b"><td className="p-3 font-semibold">L</td><td className="p-3">40</td><td className="p-3">100-105</td><td className="p-3">86-91</td><td className="p-3">180-185</td></tr>
                    <tr className="border-b"><td className="p-3 font-semibold">XL</td><td className="p-3">42</td><td className="p-3">105-110</td><td className="p-3">91-96</td><td className="p-3">185-190</td></tr>
                    <tr className="border-b"><td className="p-3 font-semibold">XXL</td><td className="p-3">44</td><td className="p-3">110-115</td><td className="p-3">96-102</td><td className="p-3">185-190</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-zinc-600">Bottoms (cm)</h3>
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-zinc-100 uppercase text-xs">
                  <tr>
                    <th className="p-3">Size</th>
                    <th className="p-3">Waist</th>
                    <th className="p-3">Hip</th>
                    <th className="p-3">Length</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="p-3 font-semibold">S</td><td className="p-3">71-76</td><td className="p-3">89-94</td><td className="p-3">101</td></tr>
                  <tr className="border-b"><td className="p-3 font-semibold">M</td><td className="p-3">76-81</td><td className="p-3">94-99</td><td className="p-3">102</td></tr>
                  <tr className="border-b"><td className="p-3 font-semibold">L</td><td className="p-3">81-86</td><td className="p-3">99-104</td><td className="p-3">103</td></tr>
                  <tr className="border-b"><td className="p-3 font-semibold">XL</td><td className="p-3">86-91</td><td className="p-3">104-109</td><td className="p-3">104</td></tr>
                  <tr className="border-b"><td className="p-3 font-semibold">XXL</td><td className="p-3">91-96</td><td className="p-3">109-114</td><td className="p-3">105</td></tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <p className="text-[11px] text-zinc-400 mt-6">
          * Depending on your body type and dressing habits, the above sizes are for reference only.
        </p>
      </div>
    </>
  )
}