"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Clock, Heart, MoreHorizontal, Plus, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Recipe {
  id: string
  title: string
  description: string
  cookTime: string
  difficulty: "Easy" | "Medium" | "Hard"
  likes: number
  image: string
  category: string
  createdAt: string
}

export default function MyRecipesPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [myRecipes, setMyRecipes] = useState<Recipe[]>([
    {
      id: "1",
      title: "My Special Purple Smoothie",
      description: "A unique blend of purple fruits and vegetables",
      cookTime: "10 min",
      difficulty: "Easy",
      likes: 15,
      image: "/placeholder.svg?height=200&width=300",
      category: "Beverages",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Homemade Lavender Cookies",
      description: "Delicate cookies with a hint of lavender",
      cookTime: "25 min",
      difficulty: "Medium",
      likes: 8,
      image: "/placeholder.svg?height=200&width=300",
      category: "Desserts",
      createdAt: "2024-01-10",
    },
  ])

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "user")) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user || user.role !== "user") {
    return null
  }

  const handleDeleteRecipe = async (recipeId: string) => {
    try {
      // Mock API call - in real app, this would delete from database
      setMyRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId))
      toast({
        title: "Recipe deleted",
        description: "Your recipe has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete recipe. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Recipes</h1>
            <p className="text-muted-foreground">Manage your published recipes</p>
          </div>
          <Button asChild>
            <Link href="/recipes/create">
              <Plus className="mr-2 h-4 w-4" />
              Add New Recipe
            </Link>
          </Button>
        </div>

        {myRecipes.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No recipes yet</h3>
              <p className="text-muted-foreground mb-4">Start sharing your culinary creations with the community</p>
              <Button asChild>
                <Link href="/recipes/create">Create Your First Recipe</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myRecipes.map((recipe) => (
              <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{recipe.category}</Badge>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Heart className="h-4 w-4" />
                        <span>{recipe.likes}</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/recipes/${recipe.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Recipe
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/recipes/${recipe.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Recipe
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteRecipe(recipe.id)} className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Recipe
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{recipe.title}</CardTitle>
                  <CardDescription className="text-sm">{recipe.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>Created {new Date(recipe.createdAt).toLocaleDateString()}</span>
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
        )}
      </div>
    </div>
  )
}
