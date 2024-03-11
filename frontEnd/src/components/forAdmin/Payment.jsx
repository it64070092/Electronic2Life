import React, { useState, useEffect } from "react";
import backendip from "../../../backendip";
import axios from "axios";
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";


const Payment = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [editOfferId, setEditOfferId] = useState(null);
    const [editedStatus, setEditedStatus] = useState("");
    const [currentStatus, setCurrentStatus] = useState("all");
    const user = useSelector(state => state.user);
    const userId = user.user?.user?._id;
    const [paymentList, setPaymentList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://${backendip}:3000/get-payments`);
                console.log(response.data.payment);
                const updatedPayments = await Promise.all(response.data.payment.map(async payment => {
                    console.log("payment", payment)
                    const productResponse = await axios.get(`http://${backendip}:3000/get-product/${payment.productId}`);
                    return {
                        ...payment,
                        product: productResponse.data.product
                    };
                }));
                setPaymentList(updatedPayments);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId]);
    useEffect(() => {
        console.log(paymentList)
    }, [paymentList])
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleStatusChange = async (offerId, newStatus) => {
        try {
            const formData = new URLSearchParams();
            formData.append('status', newStatus);
            const response = await axios.put(`http://${backendip}:3000/update-payment/${offerId}`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (response.status === 200) {
                setPaymentList((prevpayment) =>
                    prevpayment.map((offer) =>
                        offer._id === offerId ? { ...offer, status: newStatus } : offer
                    )
                );
                Swal.fire({
                    icon: "success",
                    title: "Update success",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            setEditOfferId(null);
            setEditedStatus("");
        } catch (error) {
            console.error("Error updating offer status:", error);
        }
    };

    const filteredpayment = paymentList.filter((offer) => {
        if (currentStatus === "all") {
            return true;
        }
        return offer.status === currentStatus;
    });

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex justify-center mb-4">
                    {/* Tab bar for filtering by status */}
                    <button
                        className={`px-4 py-2 mx-2 rounded-md ${currentStatus === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setCurrentStatus('all')}
                    >
                        All
                    </button>
                    <button
                        className={`px-4 py-2 mx-2 rounded-md ${currentStatus === 'รอการตรวจสอบ' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setCurrentStatus('รอการตรวจสอบ')}
                    >
                        รอการตรวจสอบ
                    </button>
                    <button
                        className={`px-4 py-2 mx-2 rounded-md ${currentStatus === 'อนุมัติการชำระเงิน' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setCurrentStatus('อนุมัติการชำระเงิน')}
                    >
                        อนุมัติการชำระเงิน
                    </button>
                    <button
                        className={`px-4 py-2 mx-2 rounded-md ${currentStatus === 'กำลังดำเนินการขนส่งสินค้า' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setCurrentStatus('กำลังดำเนินการขนส่งสินค้า')}
                    >
                        กำลังดำเนินการส่งสินค้า
                    </button>
                    <button
                        className={`px-4 py-2 mx-2 rounded-md ${currentStatus === 'สำเร็จ' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setCurrentStatus('สำเร็จ')}
                    >
                        สำเร็จ
                    </button>
                    {/* Add buttons for other statuses */}
                </div>
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
                            <th scope="col" className="px-6 py-3">Tel</th>
                            <th scope="col" className="px-16 py-3">Address</th>
                            <th scope="col" className="px-6 py-3">Product Name</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Product Image</th>
                            <th scope="col" className="px-6 py-3">Payment Image</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredpayment
                            .filter((offer) =>
                                offer.product.name.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((offer) => (
                                <tr key={offer._id} className="bg-white border-b hover:bg-gray-50">

                                    <td className="px-6 py-4 font-semibold">{offer.tel}</td>
                                    <td className="px-6 py-4 font-semibold">{offer.address}</td>
                                    <td className="px-6 py-4 font-semibold">{offer.product.name}</td>
                                    <td className="px-6 py-4 font-semibold">{offer.product.description}</td>
                                    <td className="px-6 py-4 font-semibold">{offer.product.price}</td>
                                    <td >  <img
                                        src={`http://${backendip}:3000/uploads/${offer.product.productImage}`}
                                        className="w-16 md:w-32 max-w-full max-h-full"
                                        alt={offer.name}
                                    /></td>
                                    <td >  <img
                                        src={`http://${backendip}:3000/uploads/${offer.paymentImage}`}
                                        className="w-16 md:w-32 max-w-full max-h-full"
                                        alt={offer.name}
                                    /></td>
                                    <td className="px-6 py-4 font-semibold">
                                        {editOfferId === offer._id ? (
                                            <select
                                                value={editedStatus}
                                                onChange={(e) => setEditedStatus(e.target.value)}
                                                className="border border-gray-300 rounded-lg px-3 py-1"
                                            >
                                                <option value="รอการตรวจสอบ">รอการตรวจสอบ</option>
                                                <option value="อนุมัติการชำระเงิน">อนุมัติการชำระเงิน</option>
                                                <option value="กำลังดำเนินการขนส่งสินค้า">กำลังดำเนินการขนส่งสินค้า</option>
                                                <option value="สำเร็จ">สำเร็จ</option>
                                            </select>
                                        ) : (
                                            offer.status
                                        )}
                                    </td>
                                 
                                    <td className="px-6 py-4">
                                        {editOfferId === offer._id ? (
                                            <>
                                                <button
                                                    onClick={() => handleStatusChange(offer._id, editedStatus)}
                                                    className="px-3 py-1 bg-green-500 text-white rounded-md mr-2"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditOfferId(null);
                                                        setEditedStatus("");
                                                    }}
                                                    className="px-3 py-1 bg-red-500 text-white rounded-md"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => setEditOfferId(offer._id)}
                                                className="px-3 py-1 bg-blue-500 text-white rounded-md"
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Payment;
