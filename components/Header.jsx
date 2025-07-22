"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Menu, X, LogIn, LogOut, User as UserIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { path: "/", name: "Home" },
  { path: "/todo", name: "Todos" },
  { path: "/contact", name: "Contact" },
  { path: "/about", name: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const getNavLinkClass = (path) =>
    pathname === path
      ? "text-blue-300"
      : "text-white hover:text-blue-300 transition";

  return (
    <header className="bg-gray-800 text-white py-2 shadow-md fixed top-0 left-0 w-full z-50">
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
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <Menu />
          </button>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-white hover:text-blue-300 transition"
            >
              <User size={24} />
            </button>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
              >
                {session ? (
                  <>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <UserIcon className="inline mr-2" size={16} />
                      View Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      <LogOut className="inline mr-2" size={16} />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <LogIn className="inline mr-2" size={16} />
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute top-full left-0 right-0 bg-gray-700 text-white shadow-lg"
        >
          <div className="flex justify-end p-2">
            <button
              className="cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X />
            </button>
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