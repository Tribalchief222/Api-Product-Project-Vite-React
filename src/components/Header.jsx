import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 py-4 px-5">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to={"/"} className="text-white text-xl font-semibold ml-2">
            My Store
          </Link>
        </div>
        <div className="flex items-center">
          <Link to="/cart">
            <AiOutlineShoppingCart size={20} color="white" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
