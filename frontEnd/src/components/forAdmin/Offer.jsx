import React, { useState } from "react";
import backendip from '../../../backendip';

const Offer = () => {

    const [Offers, setOffers] = useState([]);
    useEffect(() => {
        // Fetch products from backend when the component mounts
        axios.get(`http://${backendip}:3000/get-products`)
          .then(response => {
            setProducts(response.data.products);
          })
          .catch(error => {
            console.error('Error fetching products:', error);
          });
      }, []); // Empty dependency array ensures this effect runs only once
    
  return (
    <div class="container mx-auto px-4 py-8">
  <h2 class="text-2xl font-bold mb-4">Electronic Waste Offerings</h2>
  <div class="overflow-x-auto">
    <table class="table-auto border-collapse border border-gray-500">
      <thead>
        <tr>
          <th class="px-4 py-2 bg-gray-200 border border-gray-500">Product</th>
          <th class="px-4 py-2 bg-gray-200 border border-gray-500">Description</th>
          <th class="px-4 py-2 bg-gray-200 border border-gray-500">Price</th>
          <th class="px-4 py-2 bg-gray-200 border border-gray-500">Rating</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="px-4 py-2 border border-gray-500">Product A</td>
          <td class="px-4 py-2 border border-gray-500">Description of Product A</td>
          <td class="px-4 py-2 border border-gray-500">100</td>
          <td class="px-4 py-2 border border-gray-500">4.5/5</td>
        </tr>
        <tr>
          <td class="px-4 py-2 border border-gray-500">Product B</td>
          <td class="px-4 py-2 border border-gray-500">Description of Product B</td>
          <td class="px-4 py-2 border border-gray-500">150</td>
          <td class="px-4 py-2 border border-gray-500">4.2/5</td>
        </tr>
        {/* <!-- Add more rows as needed --> */}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default Offer;
