import { FaSearch } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1a1928] text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        {/* About Us */}
        <div className="text-left">
          <h4 className="text-lg font-semibold mb-2">About Us</h4>
          <p className="text-sm mb-4">
            Welcome to our website, a wonderful place to explore and learn how to cook like a pro.
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md bg-white text-black text-sm w-[180px] placeholder:text-gray-500"
            />
            <button className="ml-2 px-4 py-2 bg-pink-500 text-white rounded-md text-sm font-medium">
              Send
            </button>
          </div>
        </div>

        {/* Learn More */}
        <div className="text-left">
          <h4 className="text-lg font-semibold mb-2">Learn More</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#">Our Cooks</a></li>
            <li><a href="#">See Our Features</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Shop */}
        <div className="text-left">
          <h4 className="text-lg font-semibold mb-2">Shop</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#">Gift Subscription</a></li>
            <li><a href="#">Send Us Feedback</a></li>
          </ul>
        </div>

        {/* Recipes */}
        <div className="text-left">
          <h4 className="text-lg font-semibold mb-2">Recipes</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#">What to Cook This Week</a></li>
            <li><a href="#">Pasta</a></li>
            <li><a href="#">Dinner</a></li>
            <li><a href="#">Healthy</a></li>
            <li><a href="#">Vegetarian</a></li>
            <li><a href="#">Vegan</a></li>
            <li><a href="#">Christmas</a></li>
          </ul>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <div className="flex items-center space-x-2">
          <FaSearch className="text-white" />
          <span className="text-white font-semibold">Chefify</span>
          <span>2023 Chefify Company</span>
        </div>
        <div className="mt-2 md:mt-0 space-x-4">
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
