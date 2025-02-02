import React from "react";

const AdminFooter = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 fixed bottom-0 w-full">
      <p className="text-sm">&copy; {new Date().getFullYear()} Admin Panel. All rights reserved.</p>
    </footer>
  );
};

export default AdminFooter;
