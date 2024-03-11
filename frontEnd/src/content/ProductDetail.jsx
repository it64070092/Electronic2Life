import React, { useEffect, useState } from "react";
import backendip from "../../backendip";
import "../App.css";
import { useParams } from "react-router-dom";
import { ComplexNavbar } from "../components/NavBar";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
function ProductDetail() {
  const user = useSelector(state => state.user);
  const userId = user.user?.user?._id;
  const [product, setProduct] = useState({});
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [formData, setFormData] = useState({
    tel: '',
    name: "",
    address: "",
    paymentImage: null, // Add state for the payment image file
  });
  const { productId } = useParams();

  useEffect(() => {
    axios
      .get(`http://${backendip}:3000/get-product/${productId}`)
      .then((response) => {
        console.log(response.data.product);
        setProduct(response.data.product);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [productId]);

  const handleOpenPaymentForm = () => {
    setShowPaymentForm(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // Update the formData state based on input changes
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value, // Set the value to the file if it's an image input, otherwise use the input value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create form data object
      const paymentData = new FormData();
      paymentData.append("address", formData.address);
      paymentData.append("paymentImage", formData.paymentImage);
      paymentData.append("tel", formData.tel);
      paymentData.append("userId", userId)
      paymentData.append("status", "รอการตรวจสอบ")
      paymentData.append("productId",productId)


      // Make POST request to submit payment data
      const response = await axios.post(
        `http://${backendip}:3000/post-payment`,
        paymentData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // Handle success
      if (response.status >= 200 && response.status < 300) {
        Swal.fire({
          icon: "success",
          title: "ส่งสำเร็จ",
          showConfirmButton: false,
          timer: 1500
        });
      }
      // Reset form data
      setFormData({
        name: "",
        email: "",
        address: "",
        paymentImage: null,
      });
      // Close the payment form
      setShowPaymentForm(false);
      // You can add further logic here, like displaying a success message
    } catch (error) {
      console.error("Error submitting payment:", error);

      Swal.fire({
        icon: "error",
        title: error.response.data.error,
        showConfirmButton: false,
        timer: 1500
      });

      // Handle error
      // You can add further error handling logic here, like displaying an error message to the user
    }
  };

  return (
    <>
      <ComplexNavbar />
      <div className="flex flex-row items-center justify-center h-screen px-9">
        <div className="flex flex-col w-3/5 h-3/5 justify-center items-center rounded-3xl ml-30">
          <img
            src={`http://${backendip}:3000/uploads/${product.productImage}`}
            alt="product"
            className="object-contain w-full h-full rounded-3xl"
          />
        </div>
        <div className="flex flex-col w-1/2 h-3/5 justify-center ml-20 gap-6">
          <div className="flex flex-row w-full justify-start">
            <h1 className="text-4xl">ชื่อสินค้า {product.name}</h1>
          </div>
          <div className="flex flex-col w-5/6 h-full px-6 py-6 justify-evenly bg-gray-200 rounded-3xl border-2 border-solid border-black">
            <p>รายละเอียด</p>
            <p className="px-2 py-2">{product.description}</p>
            <div className="flex flex-row justify-between">
              <div className="px-2 py-2">
                <p className="text-2xl">ราคา {product.price} บาท</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleOpenPaymentForm}
            className="w-5/6 bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-700"
          >
            สั่งซื้อ
          </button>
        </div>
      </div>
      {showPaymentForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Payment Form</h2>
            <form onSubmit={handleSubmit}>

              <div className="mb-4">
                <label className="block mb-1">
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="tel"
                  id="tel"
                  name="tel"
                  value={formData.tel}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block mb-1">
                  ที่อยู่
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="paymentImage" className="block mb-1">
                  รูปใบเสร็จ (อัปโหลดรูปภาพ)
                </label>
                <input
                  type="file"
                  id="paymentImage"
                  name="paymentImage"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Submit Payment
              </button>
              <button
                onClick={() => setShowPaymentForm(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ml-4"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetail;
