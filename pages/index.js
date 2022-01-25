import { useState, useEffect } from "react"
import styles from "../styles/Home.module.css"
import Link from "next/link"
import supabase from "../utils/supabase"

export async function getStaticProps() {
  let { data: posts, error } = await supabase.from("posts")
  console.log(error)
  if (error) {
    throw new Error(JSON.stringify(error))
  }
  return {
    props: {
      posts: posts,
      error: false,
    },
  }
}

export default function Home({ posts }) {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    console.log(session)
  }, [])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      alert(`Error signing out ${JSON.stringify(error, null, 2)}`)
    }
  }
  return (
    <div className={styles.container}>
      <nav>
        {session.user.email && <p>Welcome back {session.user.email}</p>}
        <ul>
          {!session && (
            <>
              <li>
                <Link href="/login">
                  <a>Login in</a>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <a>Sign up</a>
                </Link>
              </li>
            </>
          )}
          {session && (
            <li>
              <button onClick={handleLogout}>Log out</button>
            </li>
          )}
        </ul>
      </nav>
      {!session ? (
        "login to see posts"
      ) : (
        <pre>{JSON.stringify(posts, null, 2)}</pre>
      )}
    </div>
  )
}
