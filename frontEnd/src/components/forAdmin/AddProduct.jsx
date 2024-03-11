import React, { useState } from 'react';
import axios from 'axios';
import backendip from '../../../backendip';
import Swal from 'sweetalert2'
const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null // Store file object here
  });
  const [imageUrl, setImageUrl] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // If the input is of type file, update the state with the selected file
    if (name === 'image') {
      const selectedFile = files[0];
      setFormData({ ...formData, [name]: selectedFile });
      setImageUrl(URL.createObjectURL(selectedFile)); // Create URL for the selected image
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('productImage', formData.image);
    
    try {
      const response = await axios.post('http://' + backendip + ':3000/post-product', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response:', response.data);
      if (response.status >= 200 && response.status < 300) {
        Swal.fire({
          icon: "success",
          title: "Product has been added",
          showConfirmButton: false,
          timer: 1500
        });
      }
      // Reset form fields after successful submission
      setFormData({
        name: '',
        price: '',
        description: '',
        image: null
      });
      setImageUrl(''); // Clear image URL
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: error.response.data.error,
            showConfirmButton: false,
            timer: 1500
          });
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600">Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
          {/* Display selected image */}
          {imageUrl && (
            <img src={imageUrl} alt="Selected" className="mt-2 max-w-full h-auto" />
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
