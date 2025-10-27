// src/components/recipes/RecipeCard.jsx
import { Clock, Star, ChefHat, Heart } from "lucide-react";
import { useState, useEffect } from "react";

export default function RecipeCard({ recipe, onNavigate }) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const getFullId = () => `${recipe.type}-${recipe.id}`;

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(getFullId()));
  }, [recipe.id, recipe.type]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const fullId = getFullId();
    if (isFavorite) {
      const newFavorites = favorites.filter((id) => id !== fullId);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      favorites.push(fullId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
    // notify other parts of the app (e.g., navbar) that favorites changed
    try {
      window.dispatchEvent(new Event('favoritesUpdated'));
    } catch (e) {
      // ignore in non-browser environments
    }
  };

  return (
    <div
      className="group transform transition-all duration-700 hover:scale-105"
      onClick={() => onNavigate && onNavigate("detail", getFullId())}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onNavigate && onNavigate('detail', getFullId());
        }
      }}
    >
      <div className="relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl shadow-blue-500/5 hover:shadow-blue-500/15 transition-all duration-500 cursor-pointer group-hover:bg-white/20">
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
            className="p-2 bg-white/50 rounded-full"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "text-red-500 fill-current" : "text-slate-600"
              }`}
            />
          </button>
        </div>
        <div className="relative h-32 md:h-56 overflow-hidden">
          <img
            src={recipe.image_url}
            alt={recipe.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="relative z-10 p-4 md:p-8">
          <span
            className={`text-xs font-semibold ${
              recipe.type === "makanan"
                ? "text-blue-700 bg-blue-100/90"
                : "text-green-700 bg-green-100/90"
            } px-2 md:px-3 py-1 md:py-1.5 rounded-full`}
          >
            {recipe.type === "makanan" ? "Makanan" : "Minuman"}
          </span>
          <h3 className="font-bold text-slate-800 mb-3 md:mb-4 text-base md:text-xl group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {recipe.name}
          </h3>
          <div className="flex items-center justify-between text-xs md:text-sm text-slate-600">
            <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
              <Clock className="w-3 h-3 md:w-4 md:h-4" />
              <span className="font-medium">
                {recipe.ingredients.length} bahan
              </span>
            </div>
            <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
              <ChefHat className="w-3 h-3 md:w-4 md:h-4" />
              <span className="font-medium">{recipe.steps.length} langkah</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
