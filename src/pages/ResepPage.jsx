// src/pages/ResepPage.jsx
import { useState, useEffect } from "react";
import { ResepMakanan } from "../data/makanan";
import { ResepMinuman } from "../data/minuman";
import RecipeCard from "../components/recipes/RecipeCard.jsx";
import Pagination from "../components/recipes/Pagination.jsx";

export default function ResepPage({ onNavigate }) {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(6);

  useEffect(() => {
    const allMakanan = Object.values(ResepMakanan.resep).map((recipe) => ({
      ...recipe,
      id: `makanan-${recipe.id}`, // ID unik
      type: "makanan",
    }));
    const allMinuman = Object.values(ResepMinuman.resep).map((recipe) => ({
      ...recipe,
      id: `minuman-${recipe.id}`, // ID unik
      type: "minuman",
    }));
    setRecipes([...allMakanan, ...allMinuman]);
  }, []);

  // Get current recipes
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-center mb-4">
          Jelajahi Semua Resep
        </h1>
        <p className="text-center text-slate-500 max-w-2xl mx-auto mb-8">
          Temukan inspirasi masakan dan minuman favoritmu.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {currentRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onNavigate={onNavigate}
            />
          ))}
        </div>
        <Pagination
          recipesPerPage={recipesPerPage}
          totalRecipes={recipes.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </main>
    </div>
  );
}