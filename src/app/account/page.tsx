"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function Account() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 1. Protect the route: If not logged in, kick them to the login page
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // 2. Show a loading state while checking the cookie
  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white text-black">
        <p className="text-[14px] uppercase tracking-[2px] animate-pulse">Loading...</p>
      </div>
    );
  }

  // 3. Prevent a flash of content if they are not logged in
  if (status === "unauthenticated") {
    return null; 
  }

  // 4. Extract the first letter of their name for the profile circle
  const firstLetter = session?.user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-6 md:px-12 py-12 md:py-24 max-w-[1200px] mx-auto">
      
      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        
        {/* Left Column: User Profile Info */}
        <div className="w-full md:w-1/3">
          <h1 className="text-[32px] font-hero uppercase tracking-widest mb-8">My Account</h1>
          
          <div className="flex items-center gap-6 mb-10">
            {/* Profile Avatar */}
            <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-[32px] font-hero">
              {firstLetter}
            </div>
            
            {/* Name & Email */}
            <div>
              <p className="text-[18px] font-bold uppercase tracking-[1px]">
                {session?.user?.name}
              </p>
              <p className="text-[14px] text-zinc-500">
                {session?.user?.email}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-[13px] uppercase tracking-[2px] border-t border-zinc-200 pt-6">
            <Link href="/account/orders" className="hover:opacity-50 transition-opacity">Order History</Link>
            <Link href="/account/settings" className="hover:opacity-50 transition-opacity">Account Settings</Link>
            <button 
              onClick={() => signOut({ callbackUrl: "/" })} // 👈 Logs out and sends them to homepage
              className="text-left text-red-500 hover:opacity-50 transition-opacity"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Right Column: Dashboard Content */}
        <div className="w-full md:w-2/3">
          <div className="bg-zinc-50 border border-zinc-200 p-8 md:p-12">
            <h2 className="text-[24px] font-hero uppercase tracking-widest mb-4">
              Welcome back, {session?.user?.name?.split(" ")[0]}
            </h2>
            <p className="text-[14px] text-zinc-500 mb-8 leading-relaxed uppercase tracking-[1px]">
              From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
            </p>
            
            <Link 
              href="/shop" 
              className="inline-block bg-black text-white px-8 py-4 text-[12px] font-bold uppercase tracking-[2px] hover:bg-zinc-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}