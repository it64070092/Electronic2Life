import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backendip from '../../../backendip';
import Swal from 'sweetalert2';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [sortedBy, setSortedBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortColumn, setSortColumn] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [editProductId, setEditProductId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedProductImage, setEditedProductImage] = useState('');

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

  const handleSort = (key) => {
    const sortedProducts = [...products];
    if (sortedBy === key) {
      sortedProducts.reverse();
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      sortedProducts.sort((a, b) => {
        if (key === 'price') {
          return sortDirection === 'asc' ? a[key] - b[key] : b[key] - a[key];
        } else {
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
          return 0;
        }
      });
      setSortColumn(key);
      setSortDirection('asc');
    }
    setProducts(sortedProducts);
    setSortedBy(key);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products
    .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleEdit = (productId, name, description, price, productImage) => {
    setEditProductId(productId);
    setEditedName(name);
    setEditedDescription(description);
    setEditedPrice(price);
    setEditedProductImage(productImage);
  };

  const handleCancelEdit = () => {
    setEditProductId(null);
  };

  const handleUpdate = () => {
    // Send update request to the backend API
    axios.put(`http://${backendip}:3000/update-product/${editProductId}`, {
      name: editedName,
      description: editedDescription,
      price: editedPrice,
      productImage: editedProductImage
    })
      .then(response => {
        if (response.status === 200) {
          Swal.fire(
            'Updated!',
            'The product has been updated.',
            'success'
          );
          // Update the product in the state
          setProducts(products.map(product => {
            if (product._id === editProductId) {
              return {
                ...product,
                name: editedName,
                description: editedDescription,
                price: editedPrice,
                productImage: editedProductImage
              };
            }
            return product;
          }));
          setEditProductId(null);
        }
      })
      .catch(error => {
        console.error('Error updating product:', error);
        Swal.fire(
          'Error!',
          'Failed to update the product.',
          'error'
        );
      });
  };

  const handleDelete = (productId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete the product from the backend
        axios.delete(`http://${backendip}:3000/delete-products/${productId}`)
          .then(response => {
            if (response.status === 200) {
              Swal.fire(
                'Deleted!',
                'Your product has been deleted.',
                'success'
              );
              // Remove the deleted product from the state
              setProducts(products.filter(product => product._id !== productId));
            }
          })
          .catch(error => {
            console.error('Error deleting product:', error);
            Swal.fire(
              'Error!',
              'Failed to delete the product.',
              'error'
            );
          });
      }
    });
  };

  return (
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
            <th scope="col" class="px-6 py-3 cursor-pointer" onClick={() => handleSort('name')}>
              Product Name
              {sortColumn === 'name' && (
                <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
              )}
            </th>
            <th scope="col" class="px-6 py-3 cursor-pointer" onClick={() => handleSort('name')}>
              Description

            </th>
            <th scope="col" class="px-6 py-3 cursor-pointer" onClick={() => handleSort('price')}>
              Price
              {sortColumn === 'price' && (
                <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
              )}
            </th>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => (
            <tr key={product._id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-semibold">
                {editProductId === product._id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={e => setEditedName(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1"
                  />
                ) : (
                  product.name
                )}
              </td>
              <td className="px-6 py-4 font-semibold">
                {editProductId === product._id ? (
                  <input
                    type="text"
                    value={editedDescription}
                    onChange={e => setEditedDescription(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1"
                  />
                ) : (
                  product.description
                )}
              </td>
              <td className="px-6 py-4 font-semibold">
                {editProductId === product._id ? (
                  <input
                    type="text"
                    value={editedPrice}
                    onChange={e => setEditedPrice(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1"
                  />
                ) : (
                  product.price
                )}
              </td>
              <td className="p-4">
                {editProductId === product._id ? (
                  <input
                    type="text"
                    value={editedProductImage}
                    onChange={e => setEditedProductImage(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1"
                  />
                ) : (
                  <img src={`http://${backendip}:3000/uploads/${product.productImage}`} className="w-16 md:w-32 max-w-full max-h-full" alt={product.name} />
                )}
              </td>
              <td className="px-6 py-4">
                {editProductId === product._id ? (
                  <>
                    <button onClick={handleUpdate} className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2">Save</button>
                    <button onClick={handleCancelEdit} className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(product._id, product.name, product.description, product.price, product.productImage)} className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md">Edit</button>
                    <button onClick={() => handleDelete(product._id)} className="px-3 py-1 bg-red-500 text-white rounded-md ml-2">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <ul className="flex">
          {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map(number => (
            <li key={number} className="cursor-pointer mx-1">
              <a onClick={() => paginate(number + 1)} className="block px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded">{number + 1}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllProducts;
