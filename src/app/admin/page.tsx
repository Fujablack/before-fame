import { auth } from "@/auth"
import { redirect } from "next/navigation"
import AdminForm from "./AdminForm"

export default async function AdminPage() {
  const session = await auth();
  const adminEmail = ['shilevelli@gmail.com', 'beforefameofficial@gmail.com']

  // 1. If not logged in, go to login
  if (!session?.user) {
    redirect("/login")
  } else if (!adminEmail.includes(session?.user?.email as string)) {
    redirect("/")
  } else return <AdminForm />

}