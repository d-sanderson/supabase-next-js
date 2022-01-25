import { useRouter } from "next/router"
import Link from "next/link"
import supabase from "../utils/supabase"
import { useState } from 'react'
import Form from "../components/Form.js"

export default function SignupPage() {
  const router = useRouter()
  const [error, setError] = useState({})

  async function handleSubmit(event) {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    console.log({ email, password })
    const { user, session, error } = await supabase.auth.signUp({
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
        Already a member?{" "}
        <Link href="/login">
          <a>Login</a>
        </Link>
      </span>
      <Form handleSubmit={handleSubmit} fields={['email', 'password']} submitText="Sign up"/>
      {error && (
        <div>
          {error && error.status}
          {error && error.message}
        </div>
      )}
    </div>
  )
}