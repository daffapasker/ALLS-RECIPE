"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Heart, Search, Filter, Plus } from "lucide-react"
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
  category: string
}

export default function RecipesPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")

  const [recipes] = useState<Recipe[]>([
    {
      id: "1",
      title: "Purple Sweet Potato Smoothie",
      description: "A healthy and delicious smoothie with a beautiful purple color",
      author: "Chef Maria",
      cookTime: "10 min",
      difficulty: "Easy",
      likes: 24,
      image: "/placeholder.svg?height=200&width=300",
      category: "Beverages",
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
      category: "Desserts",
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
      category: "Salads",
    },
    {
      id: "4",
      title: "Blueberry Pancakes",
      description: "Fluffy pancakes loaded with fresh blueberries",
      author: "Morning Chef",
      cookTime: "20 min",
      difficulty: "Easy",
      likes: 35,
      image: "/placeholder.svg?height=200&width=300",
      category: "Breakfast",
    },
    {
      id: "5",
      title: "Eggplant Parmesan",
      description: "Classic Italian dish with layers of eggplant and cheese",
      author: "Italian Master",
      cookTime: "60 min",
      difficulty: "Hard",
      likes: 42,
      image: "/placeholder.svg?height=200&width=300",
      category: "Main Course",
    },
    {
      id: "6",
      title: "Purple Cauliflower Soup",
      description: "Creamy and nutritious soup with purple cauliflower",
      author: "Soup Lover",
      cookTime: "30 min",
      difficulty: "Medium",
      likes: 16,
      image: "/placeholder.svg?height=200&width=300",
      category: "Soups",
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

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.author.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || recipe.category === categoryFilter
    const matchesDifficulty = difficultyFilter === "all" || recipe.difficulty === difficultyFilter

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Update URL with search params
    const params = new URLSearchParams()
    if (searchQuery) params.set("search", searchQuery)
    router.push(`/recipes?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">All Recipes</h1>
            <p className="text-muted-foreground">Discover amazing recipes from our community</p>
          </div>
          {user.role === "user" && (
            <Button asChild>
              <Link href="/recipes/create">
                <Plus className="mr-2 h-4 w-4" />
                Add Recipe
              </Link>
            </Button>
          )}
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search recipes, ingredients, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Search</Button>
            </form>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Breakfast">Breakfast</SelectItem>
                  <SelectItem value="Main Course">Main Course</SelectItem>
                  <SelectItem value="Desserts">Desserts</SelectItem>
                  <SelectItem value="Beverages">Beverages</SelectItem>
                  <SelectItem value="Salads">Salads</SelectItem>
                  <SelectItem value="Soups">Soups</SelectItem>
                </SelectContent>
              </Select>

              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Showing {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? "s" : ""}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href={`/recipes/${recipe.id}`}>
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{recipe.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Heart className="h-4 w-4" />
                      <span>{recipe.likes}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{recipe.title}</CardTitle>
                  <CardDescription className="text-sm">{recipe.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>by {recipe.author}</span>
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
              </Link>
            </Card>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No recipes found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search terms or filters</p>
              <Button asChild variant="outline">
                <Link href="/recipes">View All Recipes</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
