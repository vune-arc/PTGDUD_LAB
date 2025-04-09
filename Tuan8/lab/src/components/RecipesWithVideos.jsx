import { FaRegBookmark } from "react-icons/fa";

const videoRecipes = [
  {
    title: "Salad with cabbage and shrimp",
    time: "32 minutes",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Salad of cove beans, shrimp and potatoes",
    time: "20 minutes",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Sunny-side up fried egg",
    time: "15 minutes",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Lotus delight salad",
    time: "20 minutes",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
  },
];

export default function RecipesWithVideos() {
  return (
    <div className="px-4 py-10 text-center">
      <h2 className="text-pink-600 text-3xl font-bold mb-2">
        Recipes With Videos
      </h2>
      <p className="text-gray-600 mb-6">
        Cooking Up Culinary Creations with Step-by-Step Videos
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {videoRecipes.map((recipe, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-300 text-left"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{recipe.title}</h3>
                <p className="text-pink-500 text-sm mt-2">{recipe.time}</p>
              </div>
              <FaRegBookmark className="text-pink-500 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
