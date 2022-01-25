import { useRouter } from "next/router"
import React from "react"
import Form from "../components/Form"
import supabase from "../utils/supabase"

const CreatePostPage = () => {
  const router = useRouter()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const content = event.target.content.value
    const user_id = supabase.auth.user().id
    console.log(supabase.auth.user())
    if (user_id) {
      const { data, error } = await supabase
        .from("posts")
        .insert([{ title, content, user_id }])
        
      if (!error) {
        console.log(data[0].id)
        router.push(`/${data[0].id}`)
      }
      console.log(error)
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
        ]}
      />
    </div>
  )
}

export default CreatePostPage
