import styles from "../styles/Home.module.css"
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
  console.log(supabase.auth.user())
  return (
    <div className={styles.container}>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  )
}
