import React from "react";
import { FaRegBookmark } from "react-icons/fa";

const recipes = [
    {
      title: "Italian-style tomato salad",
      time: "14 minutes",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Spaghetti with vegetables and shrimp",
      time: "15 minutes",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Lotus delight salad",
      time: "20 minutes",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Snack cakes",
      time: "21 minutes",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    },
  ];

export default function SummerRecipes() {
  return (
    <div className="py-10 px-6 md:px-16 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">
        This Summer Recipes
      </h2>
      <p className="text-gray-600 mb-8">
        We have all your Independence Day sweets covered.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-md border"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-left">
              <h3 className="font-semibold text-gray-900 text-base">
                {recipe.title}
              </h3>
              <div className="flex justify-between items-center mt-2">
                <p className="text-pink-500 text-sm">{recipe.time}</p>
                <FaRegBookmark className="text-pink-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
