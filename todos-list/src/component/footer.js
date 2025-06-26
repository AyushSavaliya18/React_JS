import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-black py-4 mt-10 text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} Todo List App by Ayush Savaliya. All rights
        reserved.
      </p>
      <p className="text-xs mt-1">Built using React</p>
    </footer>
  );
}

export default Footer;
