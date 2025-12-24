import LoginPage from "@/registry/view/login-3/page"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (
    <>
      <LoginPage />
    </>
  )
}
