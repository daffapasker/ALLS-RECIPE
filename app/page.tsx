"use client"

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Search, Upload, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  if (user) {
    return null // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <ChefHat className="h-16 w-16 text-primary mr-4" />
            <h1 className="text-6xl font-bold text-primary">ALL'S Recipe</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover, share, and create amazing recipes with our vibrant cooking community. From traditional dishes to
            modern creations, find your next culinary adventure here.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/auth/login">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <Link href="/recipes">Browse Recipes</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Share Your Recipes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Upload your favorite recipes with photos and detailed instructions. Share your culinary creativity with
                the world.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Search className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Discover New Flavors</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Search through thousands of recipes by ingredients, cuisine type, or dietary preferences. Find exactly
                what you're craving.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Join the Community</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Connect with fellow food enthusiasts, share cooking tips, and build your personal recipe collection.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start cooking?</h2>
          <p className="text-muted-foreground mb-6">Join thousands of home cooks sharing their passion for food</p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/auth/register">Create Account</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
