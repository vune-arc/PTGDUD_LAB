import { FaRegBookmark } from "react-icons/fa";

const editorPicks = [
  {
    title: "Stuffed sticky rice ball",
    author: "Jennifer King",
    avatar:
      "https://randomuser.me/api/portraits/women/65.jpg",
    description:
      "Stuffed sticky rice balls: A delightful Asian treat with chewy, glutinous rice and a flavorful surprise filling...",
    time: "34 minutes",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Strawberry smoothie",
    author: "Matthew Martinez",
    avatar:
      "https://randomuser.me/api/portraits/men/22.jpg",
    description:
      "Savor the refreshing delight of a strawberry smoothie. Made with ripe strawberries, this creamy blend offers...",
    time: "40 minutes",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Latte Art",
    author: "Sarah Hill",
    avatar:
      "https://randomuser.me/api/portraits/women/48.jpg",
    description:
      "Latte art is the skillful craft of creating captivating designs on the surface of a latte...",
    time: "19 minutes",
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Butter fried noodles",
    author: "Julia Lopez",
    avatar:
      "https://randomuser.me/api/portraits/women/75.jpg",
    description:
      "Butter fried noodles: Savory noodles cooked in butter for a delicious and satisfying meal...",
    time: "16 minutes",
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
  },
];

export default function EditorsPick() {
  return (
    <div className="px-4 py-10">
      <h2 className="text-pink-600 text-3xl font-bold text-center mb-2">
        Editor's pick
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Curated Culinary Delights: Handpicked Favorites by Our Expert Editors!
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {editorPicks.map((item, index) => (
          <div
            key={index}
            className="flex bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-36 h-36 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <FaRegBookmark className="text-pink-500" />
                </div>
                <div className="flex items-center mt-2 space-x-2">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-700">{item.author}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {item.description}
                </p>
              </div>
              <p className="text-pink-500 text-sm mt-2">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
