// src/app/page.tsx
"use client";

import { useState } from "react";
import BookGrid from "./components/BookGrid";
import { books } from "./data/books";

export default function HomePage() {
  // Simple cart handler for demo purposes
  const handleAddToCart = (bookId: string) => {
    console.log(`Added book ${bookId} to cart`);
    // Here you would typically dispatch to a cart state or call an API
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Welcome Section */}
      <section className="text-center bg-gradient-to-r from-blue-100 to-indigo-700 p-10 rounded-xl mb-12 shadow-lg">
        <h1 className="text-5xl font-bold text-gray-900 mb-3">
          Welcome to the Amana Bookstore!
        </h1>
        <p className="text-xl text-gray-700 font-medium">
          Your one-stop shop for the best books. Discover new worlds and
          adventures.
        </p>
      </section>

      {/* Book Grid */}
      <BookGrid books={books} onAddToCart={handleAddToCart} />
    </div>
  );
}
