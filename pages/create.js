import { useRouter } from "next/router"
import React, { useEffect } from "react"
import supabase from "../utils/supabase"
import Form from "../components/Form"
import useSession from "../context/sessions"

const CreatePostPage = () => {
  const router = useRouter()
  const { session } = useSession()
  useEffect(() => {
    if (session) return
    router.push("/")
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const content = event.target.content.value
    const is_published = event.target.is_published.checked
    const user_id = supabase.auth.user().id
    if (user_id) {
      const { data, error } = await supabase
        .from("posts")
        .insert([{ title, content, user_id, is_published }])

      if (!error && is_published) {
        router.push(`/${data[0].id}`)
      }
      console.log(error)
      router.push('/')
    }
  }
  return (
    <div>
      <h2>Create Post</h2>
      <Form
        handleSubmit={handleSubmit}
        submitText="Create Post"
        fields={[
          { name: "title", type: "text" },
          { name: "content", type: "text" },
          { name: "is_published", type: "checkbox" },
        ]}
      />
    </div>
  )
}

export default CreatePostPage
