// src/pages/MakananPage.jsx
import { useState, useEffect } from 'react';
import { ResepMakanan } from '../data/makanan';
import RecipeGrid from '../components/makanan/RecipeGrid';

export default function MakananPage({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;

  const allMakanan = Object.values(ResepMakanan.resep);
  useEffect(() => {
    const filter = () => {
      if (searchQuery.trim() === '') {
        setFilteredRecipes(allMakanan);
      } else {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = allMakanan.filter((recipe) =>
          recipe.name.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredRecipes(filtered);
      }
      setCurrentPage(1); // Reset to first page when search changes
    };

    filter();
  }, [searchQuery, allMakanan.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Cari Makanan</label>
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berdasarkan nama..."
              className="w-full rounded-lg border border-gray-200 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Calculate paginated recipes */}
        {(() => {
          const indexOfLastRecipe = currentPage * recipesPerPage;
          const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
          const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
          const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

          return (
            <>
              <RecipeGrid recipes={currentRecipes} onNavigate={onNavigate} />
              
              {/* Pagination controls */}
              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  } transition-colors duration-200`}
                >
                  Sebelumnya
                </button>
                <span className="flex items-center px-4 font-medium text-gray-700">
                  Halaman {currentPage} dari {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  } transition-colors duration-200`}
                >
                  Berikutnya
                </button>
              </div>
            </>
          );
        })()}
      </main>
    </div>
  );
}