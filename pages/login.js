import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import supabase from "../utils/supabase"
import Form from "../components/Form.js"
export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState({})
  async function handleSubmit(event) {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    })
    if (error) {
      const { status, message } = error
      setError({ status, message })
    }
    if (user) {
      router.push("/")
    }
  }

  return (
    <div>
      <span>
        Not a member?{" "}
        <Link href="/signup">
          <a>Sign up</a>
        </Link>
      </span>
      <Form handleSubmit={handleSubmit} submitText="Login"/>
      {error && (
        <div>
          {error && error.status}
          {error && error.message}
        </div>
      )}
    </div>
  )
}
