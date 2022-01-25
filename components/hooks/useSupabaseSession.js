import React, { useEffect, useState } from "react"
import supabase from "../../utils/supabase"

function useSupabaseSession() {
  const [session, setSession] = useState(null)
  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  
  return {
    session,
    setSession,
  }
}

export default useSupabaseSession
