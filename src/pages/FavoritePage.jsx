// src/pages/FavoritePage.jsx
import { useState, useEffect } from "react";
import RecipeCard from "../components/recipes/RecipeCard.jsx";
import { ResepMakanan } from "../data/makanan";
import { ResepMinuman } from "../data/minuman";

export default function FavoritePage({ onNavigate }) {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  // Function to load favorite recipes
  const loadFavoriteRecipes = () => {
    const allMakanan = Object.values(ResepMakanan.resep).map((recipe) => ({
      ...recipe,
      id: `makanan-${recipe.id}`,
      type: "makanan",
    }));
    const allMinuman = Object.values(ResepMinuman.resep).map((recipe) => ({
      ...recipe,
      id: `minuman-${recipe.id}`,
      type: "minuman",
    }));
    const allRecipes = [...allMakanan, ...allMinuman];
    const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavoriteRecipes(
      allRecipes.filter((recipe) => favoriteIds.includes(recipe.id))
    );
  };

  // Load initial data
  useEffect(() => {
    loadFavoriteRecipes();
  }, []);

  // Listen for favorites updates
  useEffect(() => {
    const handleFavoritesUpdated = () => {
      loadFavoriteRecipes();
    };

    window.addEventListener('favoritesUpdated', handleFavoritesUpdated);
    window.addEventListener('storage', handleFavoritesUpdated);

    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdated);
      window.removeEventListener('storage', handleFavoritesUpdated);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-center mb-4">
          Resep Favorit
        </h1>
        <p className="text-center text-slate-500 max-w-2xl mx-auto mb-8">
          Koleksi resep-resep kesukaanmu.
        </p>
        {favoriteRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {favoriteRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-500">Kamu belum punya resep favorit.</p>
          </div>
        )}
      </main>
    </div>
  );
}