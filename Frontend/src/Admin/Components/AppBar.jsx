import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function AppBar() {
  const [isOpen, setIsOpen] = useState(false);
  const Pages = [
    { pageName: "Dhashboard", pageURL: "/admin" },
    { pageName: "Hotel & Rooms", pageURL: "/admin/hotel" },
  ];
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-red shadow-md fixed top-0 left-0 right-0 z-50" style={{position:"sticky",top:'0px'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 text-xl font-bold text-blue-600">
            ADMIN
          </div>

          <div className="hidden md:flex space-x-6">
            {Pages.map((page, i) => {
              return (
                <Link to={page.pageURL} key={i}>
                  <h6>{page.pageName}</h6>
                </Link>
              );
            })}
          </div>

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

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow">
            {Pages.map((page, i) => {
              return (
                <Link to={page.pageURL} key={i}>
                  <h6>{page.pageName}</h6>
                </Link>
              );
            })}
        </div>
      )}
    </nav>
  );
}
