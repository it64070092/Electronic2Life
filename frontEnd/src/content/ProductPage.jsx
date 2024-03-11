import { useEffect, useState } from "react";
import backendip from "../../backendip";
import "../App.css";
import { ComplexNavbar } from "../components/NavBar";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://" + backendip + ":3000/get-products")
      .then((response) => {
        console.log(response.data.products);
        setProducts(response.data.products);
        // console.log(products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  function ToProductDetail(productId) {
    navigate(`/product/${productId}`);
  }

  return (
    <>
      <ComplexNavbar />
      <section>
        {/* <div class="flex flex-row mx-10 my-10"> */}
        <div class="flex flex-col md:flex-row mx-2 md:mx-10 my-10">
          {/* Left side content */}
          {/* <div class="flex flex-col w-1/3 h-[50%] pl-4 pt-4 bg-white rounded-lg shadow-lg overflow-hidden"> */}
          <div class="flex flex-col h-[70%] w-full md:w-1/3 bg-white rounded-lg shadow-lg overflow-hidden mb-4 md:mb-0">
            <div class="p-3">
              <h2 class="text-lg font-semibold text-gray-800 mb-2">Product</h2>
              <div class="flex items-center mb-4">
                <input
                  type="text"
                  class="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                />
              </div>
              <div class="mb-9">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    class="form-checkbox h-5 w-5 text-blue-500 my-2"
                  />
                  <span class="ml-2 text-gray-700">Laptop</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    class="form-checkbox h-5 w-5 text-blue-500 my-2"
                  />
                  <span class="ml-2 text-gray-700">Phone</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right side content */}
          {/* <div class="grid grid-cols-4 gap-4 mx-8 "> */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-2 md:mx-8 ">
            {products.map((product) => (
              <div class="h-full w-52 mr-6 bg-white shadow-md rounded-lg overflow-hidden">
                <div onClick={() => ToProductDetail(product._id)} class="top flex justify-center w-full h-48">
                  <img
                    class="w-full object-cover transition duration-300 transform hover:scale-105"
                    src={product.productImage}
                    alt="Image"
                  />
                </div>
                <div class="p-4">
                  <p class="text-gray-800 text-sm truncate">{product.name}</p>
                  <h class="text-gray-600 text-sm truncate">
                    {product.description}
                  </h>
                  <div class="flex justify-between mt-1">
                    <h class="text-gray-800 text-base font-medium truncate">
                      ${product.price}
                    </h>
                    <h class="text-green-500 text-sm truncate mt-1">in stock</h>
                  </div>
                  <div class="flex justify-between mt-2">
                    <button
                      class="bg-black text-sm hover:bg-gray-700 text-white py-0 px-4 rounded"
                    >
                      + Add To Cart
                    </button>
                    <Square3Stack3DIcon class="h-5 w-5 text-red-500 mr-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductPage;
