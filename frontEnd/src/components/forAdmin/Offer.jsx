import React, { useState, useEffect } from "react";
import backendip from "../../../backendip";
import axios from "axios";

const Offer = () => {
  const [offers, setOffers] = useState([]);
  const [products, setProducts] = useState([]);
  const [sortedBy, setSortedBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [editProductId, setEditProductId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedProductImage, setEditedProductImage] = useState("");

  useEffect(() => {
    axios
      .get("http://" + backendip + ":3000/get-offer")
      .then((response) => {
        console.log(response.data.offers);
        setOffers(response.data.offers);
        // console.log(Offers);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Get current products
  const currentOffers = offers.filter((offer) =>
    offer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* Search Input */}
        <div className="mt-4 mb-2 mx-2">
          <input
            type="text"
            placeholder="Search by product name"
            value={searchQuery}
            onChange={handleSearch}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <table className="w-full text-sm text-left text-gray-500 bg-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 cursor-pointer">
                Name
              </th>
              <th scope="col" class="px-6 py-3 cursor-pointer">
                Tel
              </th>
              <th scope="col" class="px-6 py-3 cursor-pointer">
                Description
              </th>
              <th scope="col" className="px-16 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
            </tr>
          </thead>
          <tbody>
            {currentOffers.map((offer) => (
              <tr
                key={Offer._id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-semibold">{offer.name}</td>
                <td className="px-6 py-4 font-semibold">{offer.tel}</td>
                <td className="px-6 py-4 font-semibold">{offer.description}</td>
                <td className="px-6 py-4 font-semibold">{offer.address}</td>
                <td className="px-6 py-4 font-semibold">{offer.status}</td>
                <td>
                  <img
                    src={`http://${backendip}:3000/uploads/${offer.offerImage}`}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={offer.name}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
      </div>
    </>
  );
};

export default Offer;
