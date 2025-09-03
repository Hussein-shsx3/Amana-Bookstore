// src/app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useState, useEffect } from "react";
import { CartItem } from "../types";

const Navbar: React.FC = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // This function updates the cart count from localStorage.
    // It's designed to run on the client side only.
    const updateCartCount = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        try {
          const cart: CartItem[] = JSON.parse(storedCart);
          const count = cart.reduce((total, item) => total + item.quantity, 0);
          setCartItemCount(count);
        } catch (error) {
          console.error("Failed to parse cart from localStorage", error);
          setCartItemCount(0);
        }
      } else {
        setCartItemCount(0);
      }
    };

    // Initial update
    updateCartCount();

    // Listen for custom event to update cart count
    window.addEventListener("cartUpdated", updateCartCount);

    // Clean up the event listener
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-10">
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-800 text-transparent bg-clip-text cursor-pointer"
        >
          Amana Bookstore
        </Link>
        <div className="flex items-center space-x-4 text-lg">
          <Link
            href="/"
            className={`text-gray-600 font-medium transition-all duration-200 hover:text-indigo-700 cursor-pointer ${
              pathname === "/" ? "text-indigo-700" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/cart"
            className={`text-gray-600 font-medium transition-all duration-200 hover:text-indigo-700 flex items-center cursor-pointer ${
              pathname === "/cart" ? "text-indigo-700" : ""
            }`}
          >
            My Cart
            {cartItemCount > 0 && (
              <span className="ml-2 bg-indigo-700 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
