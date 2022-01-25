import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"
import supabase from "../utils/supabase"
import Form from "../components/Form"
export async function getServerSideProps({ params }) {
  let { data: post, error } = await supabase
    .from("posts")
    .select("*,comments(*)")
    .eq("id", params.id)
    .single()
  if (error) {
    throw new Error(JSON.stringify(error))
  }
  return {
    props: {
      post: post,
    },
  }
}

export default function PostPage({ post }) {
  const [comments, setComments] = useState(post.comments)

  useEffect(() => {
    const subscription = supabase
      .from("comments")
      .on("INSERT", (payload) => {
        console.log(payload)
        setComments((prev) => [...prev, payload.new])
      })
      .subscribe()
    return () => supabase.removeSubscription(subscription)
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    const content = event.target.content.value
    const user_id = supabase.auth.user().id
    const { data, error } = await supabase
      .from("comments")
      .insert([{ user_id: supabase.auth.user.id, post_id: post.id, content }])

    if (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  return (
    <>
      <div className={styles.container}>
        {post.title}
        <p>{post.content}</p>
        <pre>{JSON.stringify(comments, null, 2)}</pre>
      </div>
      <Form
        handleSubmit={handleSubmit}
        fields={[{ name: "content", type: "text" }]}
        submitText="Submit"
      />
    </>
  )
}
