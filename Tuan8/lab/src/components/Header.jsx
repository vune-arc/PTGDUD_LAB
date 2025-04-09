import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow bg-white">
      {/* Logo + Search bar */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Search className="text-purple-800" />
          <span className="text-pink-600 text-xl font-bold">Chefify</span>
        </div>

        {/* Search bar */}
        <div className="bg-gray-100 px-4 py-2 rounded-full">
          <input
            type="text"
            placeholder="What would you like to cook?"
            className="bg-transparent outline-none text-sm w-60"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-6 text-blue-700 text-sm font-medium">
        <a href="#">What to cook</a>
        <a href="#">Recipes</a>
        <a href="#">Ingredients</a>
        <a href="#">Occasions</a>
        <a href="#">About Us</a>
        {/* Buttons */}
        <button className="px-4 py-2 rounded-md bg-pink-100 text-pink-600 font-semibold">
          Login
        </button>
        <button className="px-4 py-2 rounded-md bg-pink-500 text-white font-semibold">
          Subscribe
        </button>
      </nav>
    </header>
  );
}
