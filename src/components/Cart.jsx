import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
    toast.success("Product removed from cart!");
  };

  const handleIncreaseQuantity = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    const newQuantity = item.quantity + 1;
    dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
  };

  const handleDecreaseQuantity = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    const newQuantity = item.quantity - 1;

    if (newQuantity < 1) {
      dispatch(removeFromCart(itemId));
    } else {
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
    }
  };

  const cartTotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="container mx-auto py-8 px-8">
      <ToastContainer />
      {cartItems.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-xl font-bold">Your cart is empty.</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-10 justify-center">
          <div className="md:w-2/3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center border-b border-gray-200 py-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover"
                />
                <div className="flex flex-col ml-4">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      className="bg-gray-300 text-gray-700 py-1 px-2 rounded"
                    >
                      -
                    </button>
                    <p className="mx-2">{item.quantity}</p>
                    <button
                      onClick={() => handleIncreaseQuantity(item.id)}
                      className="bg-gray-300 text-gray-700 py-1 px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-gray-800 mt-2">${item.price}</p>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-red-500 mt-2 underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="md:w-1/3">
            <div className="bg-gray-100 p-4">
              <h2 className="text-xl font-semibold mb-4">Total:</h2>
              <p className="text-2xl font-bold">${cartTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
