import React, { createContext, useContext, useState, useEffect } from "react"
import supabase from "../utils/supabase"

const SessionContext = createContext(null)

export const SessionProvider = ({ children, pathname, location }) => {
  const [session, setSession] = useState(null)
  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => {
  const { session } = useContext(SessionContext)
  return {
    session,
  }
}

export default useSession
