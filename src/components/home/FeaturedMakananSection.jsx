// src/components/home/FeaturedMakananSection.jsx
import { Clock, Star, ChefHat } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function FeaturedMakananSection({ featuredMakanan }) {
  const [visibleMakanan, setVisibleMakanan] = useState(new Set());
  const makananRefs = useRef([]);

  useEffect(() => {
    const observerMakanan = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setTimeout(() => {
            setVisibleMakanan(prev => new Set(prev).add(index));
          }, index * 200);
        }
      });
    }, { threshold: 0.1 });

    makananRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index;
        observerMakanan.observe(ref);
      }
    });

    return () => {
      observerMakanan.disconnect();
    };
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-xl md:text-3xl font-bold text-slate-800">Resep Makanan</h2>
        <button className="text-slate-500 hover:text-slate-600 font-medium text-xs md:text-sm transition-colors duration-200 hover:underline">
          Lihat Semua
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {featuredMakanan.map((recipe, index) => (
          <div 
            key={recipe.id} 
            ref={el => makananRefs.current[index] = el}
            className={`group transform transition-all duration-700 ${
              visibleMakanan.has(index) 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl shadow-blue-500/5 hover:shadow-blue-500/15 transition-all duration-500 cursor-pointer group-hover:scale-105 group-hover:bg-white/20">
              
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Recipe Image*/}
              <div className="relative h-32 md:h-56 overflow-hidden">
                <img 
                  src={recipe.image_url}
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              
              <div className="relative z-10 p-4 md:p-8">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <span className="text-xs font-semibold text-blue-700 bg-blue-100/90 px-2 md:px-3 py-1 md:py-1.5 rounded-full">
                    Makanan
                  </span>
                  <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-current" />
                    <span className="text-xs md:text-sm font-semibold text-slate-700">4.8</span>
                  </div>
                </div>
                
                <h3 className="font-bold text-slate-800 mb-3 md:mb-4 text-base md:text-xl group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                  {recipe.name}
                </h3>
                
                <div className="flex items-center justify-between text-xs md:text-sm text-slate-600">
                  <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                    <Clock className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="font-medium">{recipe.ingredients.length} bahan</span>
                  </div>
                  <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                    <ChefHat className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="font-medium">{recipe.steps.length} langkah</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}