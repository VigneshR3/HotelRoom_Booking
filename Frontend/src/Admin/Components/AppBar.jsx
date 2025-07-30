import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Avater from "./Avater";

export default function AppBar() {
  const [isOpen, setIsOpen] = useState(false);
  const Pages = [
    { pageName: "Dashboard", pageURL: "/admin" },
    { pageName: "Hotel & Rooms", pageURL: "/admin/hotel" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-4">
            <div className="text-xl font-bold text-blue-600">ADMIN</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {Pages.map((page, i) => (
              <Link
                to={page.pageURL}
                key={i}
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                {page.pageName}
              </Link>
            ))}
            <Avater />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow">
          {Pages.map((page, i) => (
            <Link
              to={page.pageURL}
              key={i}
              className="block text-sm font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)} // Close menu on click
            >
              {page.pageName}
            </Link>
          ))}
          <Avater />
        </div>
      )}
    </nav>
  );
}
