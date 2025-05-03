"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("zume-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user for demo
    const mockUser = {
      id: "1",
      name: "Demo User",
      email,
    }

    setUser(mockUser)
    localStorage.setItem("zume-user", JSON.stringify(mockUser))
    setIsLoading(false)

    // Check for redirect parameter
    const searchParams = new URLSearchParams(window.location.search)
    const redirectUrl = searchParams.get("redirect")

    if (redirectUrl) {
      router.push(redirectUrl)
    } else {
      router.push("/resume-builder")
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user for demo
    const mockUser = {
      id: "1",
      name,
      email,
    }

    setUser(mockUser)
    localStorage.setItem("zume-user", JSON.stringify(mockUser))
    setIsLoading(false)

    // Check for redirect parameter
    const searchParams = new URLSearchParams(window.location.search)
    const redirectUrl = searchParams.get("redirect")

    if (redirectUrl) {
      router.push(redirectUrl)
    } else {
      router.push("/resume-builder")
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("zume-user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
