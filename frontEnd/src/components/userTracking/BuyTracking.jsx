
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import backendip from "../../../backendip";
import axios from "axios";
const BuyTracking = ({ onProductClick }) => {
    const user = useSelector(state => state.user);
    const userId = user.user?.user?._id;
    // Mock data for list of payments being repaired
    const [paymentList, setPaymentList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://${backendip}:3000/get-payments/${userId}`);
                console.log(response.data.payments);
                const updatedPayments = await Promise.all(response.data.payments.map(async payment => {
                    console.log(payment)
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
    }, [paymentList]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">รายการสินค้าที่ซื้อ</h1>
            <ul>
                {paymentList.map((payment) => (
                    <li key={payment._id} className="flex items-center justify-between border-b py-2">
                        <div className="flex items-center">
                            <img src={`http://${backendip}:3000/uploads/${payment.product.productImage}`} alt={payment.product.name} className="w-40 h-40 object-cover mr-4" />
                            <div>
                                <h3 className={`font-semibold ${payment.status === 'ไม่อนุมัติเนื่องจากไม่อยู่ในเขตให้บริการ' ? 'text-red-500' : ''}`}>{payment.product.name}</h3>
                                <p className="text-sm text-gray-600">{payment.product.description}</p>
                            </div>
                        </div>
                        <div>
                            <span className={`text-sm font-semibold ${payment.status === 'ไม่อนุมัติเนื่องจากไม่อยู่ในเขตให้บริการ' ? 'text-red-500' : ''}`}>{payment.status}</span>
                            <button onClick={() => onProductClick(payment)} className="ml-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">ดูรายละเอียด</button>
                        </div>
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default BuyTracking;
