import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import styles from "../styles/Home.module.css"
import supabase from "../utils/supabase"
import Form from "../components/Form"

export async function getServerSideProps({ params }) {
  let { data: post, error } = await supabase
    .from("posts")
    .select("*,comments(*)")
    .eq("id", params.id)
    .single()
  if (!post) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {
      post: post || null,
      error: error,
    },
  }
}

export default function PostPage({ post }) {
  const [comments, setComments] = useState(post?.comments)
  const [error, setError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!post) return
    const subscription = supabase
      .from("comments")
      .on("INSERT", (payload) => setComments((prev) => [...prev, payload.new]))
      .subscribe()
    return () => supabase.removeSubscription(subscription)
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    const content = event.target.content.value
    const user_id = supabase.auth.user()?.id
    if (!user_id) {
      setError("You must be logged in to comment!")
      return
    }
    const { data, error } = await supabase
      .from("comments")
      .insert([{ user_id, post_id: post.id, content }])

    if (error) {
      throw new Error(JSON.stringify(error))
    }
    console.log(data)
  }
  return (
    <>
      <div className={styles.container}>
        {post.title}
        <p>{post.content}</p>
        <pre>{JSON.stringify(post, null, 2)}</pre>
        <pre>{JSON.stringify(comments, null, 2)}</pre>
      </div>
      <Form
        handleSubmit={handleSubmit}
        fields={[{ name: "content", type: "text" }]}
        submitText="Submit"
      />
      {error && error}
    </>
  )
}
