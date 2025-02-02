import React from "react";

const CustomerFooter = () => {
  return (
    <footer className="bg-blue-900 text-white py-6 w-full mt-5">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          <a
            href="/"
            className="bg-white text-blue-900 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Home
          </a>
          <a
            href="/about"
            className="bg-white text-blue-900 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            About Us
          </a>
          <a
            href="/products"
            className="bg-white text-blue-900 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Products
          </a>
          <a
            href="/contact"
            className="bg-white text-blue-900 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Contact
          </a>
        </div>

        {/* Copyright Text */}
        <p className="text-lg font-semibold mt-4">
          &copy; {new Date().getFullYear()} Ayush Savaliya. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default CustomerFooter;
