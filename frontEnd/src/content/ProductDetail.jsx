import { useEffect, useState } from "react";
import backendip from "../../backendip";
import "../App.css";
import { useParams } from "react-router-dom";
import { ComplexNavbar } from "../components/NavBar";
import axios from "axios";

function ProductDetail() {
  const [Product, setProduct] = useState([]);
  const { productId } = useParams();

  useEffect(() => {
    axios
      .get("http://" + backendip + ":3000/get-product/" + productId)
      .then((response) => {
        console.log(response.data.product);
        setProduct(response.data.product);
        // console.log(product);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <>
      <div class="flex flex-row items-center justify-center h-screen px-9">
        <div class="flex flex-col w-3/5 h-3/5 justify-center items-center bg-gray-400 rounded-3xl ml-30">
          <img
            src="https://www.electrolux.co.th/globalassets/catalog/washing-machines--washer-dryers/th-ewf7524d3wb-fr-cl-1500x1500.png"
            alt="product"
            class="object-contain w-full h-full rounded-3xl"
          />
        </div>
        <div class="flex flex-col w-1/2 h-3/5 justify-center ml-20 gap-6">
          <div class="flex flex-row w-full justify-start">
            <h1 class="text-4xl">Product Name {Product.name}</h1>
          </div>
          <div class="flex flex-col w-5/6 h-full px-6 py-6 justify-evenly bg-gray-200 rounded-3xl border-2 border-solid border-black">
            <p>Description</p>
            <p class="px-2 py-2">
              {Product.description}
            </p>
            <p>ประเภท</p>
            <p class="px-2 py-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A
              architecto repellendus reprehenderit laborum dignissimos velit
              totam aperiam molestias quo. Aspernatur accusantium eligendi
              dolorem maxime harum fuga suscipit atque quod rerum.
            </p>
            <div class="flex flex-row justify-between">
              <div class="px-2 py-2">
                <p class="text-2xl">${Product.price}</p>
              </div>
              <div class="px-2 py-2">
                <p class="text-2xl">รีวิว: 4.5/5</p>
              </div>
            </div>
          </div>
          <button class="w-5/6 bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-700">
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
