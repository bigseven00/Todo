"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { path: "/", name: "Home" },
  { path: "/todo", name: "Todos" },
  { path: "/contact", name: "Contact" },
  { path: "/about", name: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getNavLinkClass = (path) =>
    pathname === path
      ? "text-blue-300"
      : "text-white hover:text-blue-300 transition";

  return (
    <header className="bg-gray-800 text-white py-2 shadow-md relative">
      <div className="mx-auto px-8 flex items-center justify-between">
        <div>
          <Link href="/" className="text-2xl font-bold mr-5">
            Todo
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={getNavLinkClass(link.path)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Menu
            className="md:hidden cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          />
          <Link
            href="/login"
            className="hidden md:flex items-center gap-2 text-white hover:text-blue-300 transition"
          >
            <User size={17} />
            <span>Login</span>
          </Link>
          <Link
            href="/login"
            className="md:hidden text-white hover:text-blue-300 transition"
          >
            <User size={17} />
          </Link>
        </div>
      </div>
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute top-full left-0 right-0 bg-gray-700 text-white shadow-lg"
        >
          <div className="flex justify-end p-2">
            <X
              className="cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            />
          </div>
          <nav className="flex flex-col items-center py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="py-2 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}