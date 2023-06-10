import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false); // Add button disabled state
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && !buttonDisabled) {
      dispatch(addToCart(product));
      setButtonDisabled(true); // Disable the button after it is clicked
      toast.success("Product added to cart!");
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />
      <div className="flex flex-col md:flex-row gap-10 justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-60 h-auto object-cover"
        />
        <div className="md:ml-8 mt-4 md:mt-0">
          <h2 className="text-2xl font-semibold mb-4">{product.title}</h2>
          <p className="text-gray-800 mb-4">${product.price}</p>
          <p className="text-gray-600">{product.description}</p>
          <button
            onClick={handleAddToCart}
            className="bg-gray-800 text-white py-2 px-4 rounded mt-4"
            disabled={buttonDisabled} // Set the disabled attribute based on the buttonDisabled state
          >
            {buttonDisabled ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
