// src/pages/DetailPage.jsx
import { ResepMakanan } from "../data/makanan";
import { ResepMinuman } from "../data/minuman";

export default function DetailPage({ recipeId }) {
  const allMakanan = Object.values(ResepMakanan.resep).map((recipe) => ({
    ...recipe,
    id: `makanan-${recipe.id}`, // ID unik
  }));
  const allMinuman = Object.values(ResepMinuman.resep).map((recipe) => ({
    ...recipe,
    id: `minuman-${recipe.id}`, // ID unik
  }));
  const allRecipes = [...allMakanan, ...allMinuman];
  const recipe = allRecipes.find((r) => r.id === recipeId);

  if (!recipe) {
    return <div className="text-center py-16">Resep tidak ditemukan.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="bg-white/50 backdrop-blur-xl border border-white/30 rounded-3xl shadow-lg md:shadow-2xl overflow-hidden">
          <img
            src={recipe.image_url}
            alt={recipe.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              {recipe.name}
            </h1>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-700 mb-2">
                Bahan-bahan:
              </h2>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-700 mb-2">
                Langkah-langkah:
              </h2>
              <ol className="list-decimal list-inside text-slate-600 space-y-2">
                {recipe.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}