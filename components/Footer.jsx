"use client"
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <p>© {currentYear} Todo App. All rights reserved.</p>
    </footer>
  );
}