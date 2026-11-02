import { auth } from "@/auth"
import { redirect } from "next/navigation"
import AdminForm from "./AdminForm"

export default async function AdminPage() {
  const session = await auth();

  // 1. If not logged in, go to login
  if (!session?.user) {
    redirect("/login")
  } else if (session?.user?.email !== 'shilevelli@gmail.com') {
    redirect("/")
  } else return <AdminForm />

}