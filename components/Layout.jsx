"use client";
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-0">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;