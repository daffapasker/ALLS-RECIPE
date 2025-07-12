"use client"

import type React from "react"

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Plus, Search, TrendingUp, Users, ChefHat, Clock, Heart } from "lucide-react"
import Link from "next/link"

interface Recipe {
  id: string
  title: string
  description: string
  author: string
  cookTime: string
  difficulty: "Easy" | "Medium" | "Hard"
  likes: number
  image: string
}

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [recentRecipes] = useState<Recipe[]>([
    {
      id: "1",
      title: "Purple Sweet Potato Smoothie",
      description: "A healthy and delicious smoothie with a beautiful purple color",
      author: "Chef Maria",
      cookTime: "10 min",
      difficulty: "Easy",
      likes: 24,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      title: "Lavender Honey Cake",
      description: "Delicate cake infused with lavender and sweetened with honey",
      author: "Baker John",
      cookTime: "45 min",
      difficulty: "Medium",
      likes: 18,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "3",
      title: "Purple Cabbage Salad",
      description: "Fresh and crunchy salad with purple cabbage and vinaigrette",
      author: "Healthy Cook",
      cookTime: "15 min",
      difficulty: "Easy",
      likes: 12,
      image: "/placeholder.svg?height=200&width=300",
    },
  ])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/recipes?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
          <p className="text-muted-foreground">
            {user.role === "admin"
              ? "Manage your platform and explore amazing recipes"
              : "Discover new recipes and share your culinary creations"}
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for recipes, ingredients, or cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Search</Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {user.role === "user" && (
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Plus className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle>Add Recipe</CardTitle>
                <CardDescription>Share your favorite recipe</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/recipes/create">Create Recipe</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle>Browse Recipes</CardTitle>
              <CardDescription>Explore all recipes</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/recipes">View All</Link>
              </Button>
            </CardContent>
          </Card>

          {user.role === "user" && (
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <ChefHat className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle>My Recipes</CardTitle>
                <CardDescription>Manage your recipes</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/recipes/my-recipes">My Collection</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {user.role === "admin" && (
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle>Manage Users</CardTitle>
                <CardDescription>User administration</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/admin/users">User Management</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Recipes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">567</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Popular Recipes</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">Trending this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Recipes */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Recipes</CardTitle>
            <CardDescription>Latest recipes from our community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentRecipes.map((recipe) => (
                <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={recipe.image || "/placeholder.svg"}
                      alt={recipe.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{recipe.title}</CardTitle>
                    <CardDescription className="text-sm">{recipe.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span>by {recipe.author}</span>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{recipe.likes}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{recipe.cookTime}</span>
                      </div>
                      <Badge
                        variant={
                          recipe.difficulty === "Easy"
                            ? "secondary"
                            : recipe.difficulty === "Medium"
                              ? "default"
                              : "destructive"
                        }
                      >
                        {recipe.difficulty}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
