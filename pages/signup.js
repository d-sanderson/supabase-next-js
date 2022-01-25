import Link from "next/link"
import supabase from "../utils/supabase"
import { useState } from 'react'
import Form from "../components/Form.js"

export default function SignupPage() {
  const [error, setError] = useState({})
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) {
        const { status, message } = error
        setError({ status, message })
      }
    if (user) {
      setSubmitted(true)
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
      <Form handleSubmit={handleSubmit} submitText="Sign up"/>
      {submitted && (
        <div className="alert__success">You have successfully signed up please check your email</div>
      )}
      {error && (
        <div className="failure">
          {error && error.status}
          {error && error.message}
        </div>
      )}
    </div>
  )
}