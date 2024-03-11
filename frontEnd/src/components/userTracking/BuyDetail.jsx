import { useState } from "react";
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import backendip from "../../../backendip";
const BuyDetail = ({ payment, onBack }) => {
    const user = useSelector(state => state.user);
    const userId = user.user?.user?._id;
    console.log(userId)
    // Mock data for product details
    // รอการตรวจสอบ เดินทาง ซ่อม ส่งคืน เสร็จสิ้น
    return (
        <div>
            <div className="flex items-center mb-4">
                <button onClick={onBack} className="mr-2 text-blue-500 hover:underline">ย้อนกลับ</button>

            </div>
            <h1 className="text-2xl font-bold">ชื่อสินค้า: {payment.product.name}</h1>
            <p className="flex-end">รหัสสินค้า {payment.product._id}</p>
            <p className="">รายละเอียดสินค้า{payment.product.description}</p>
            <p className="">ราคา: {payment.product.price} บาท</p>

            <h3>รูปสินค้า</h3>
            <div className="flex items-center">

                <img
                    src={`http://${backendip}:3000/uploads/${payment.product.productImage}`}
                    alt={payment.name}
                    className="object-cover mr-4"
                    style={{ width: '300px', height: '300px' }} // Adjust width and height as needed
                />
                <div>



                </div>
                <div className="mx-auto justify-center">
                    <h1 className={`text-3xl ${payment.status === 'ไม่อนุมัติเนื่องจากไม่อยู่ในเขตให้บริการ' ? 'text-red-500' : 'text-gray-600'}`}>สถานะการซื้อ: {payment.status}</h1>

                    <ol className="relative border-s border-gray-200 dark:border-gray-200 dark:text-gray-800 mt-10">
                    <li className="mb-10 ms-6">
                            <span className={`absolute flex items-center justify-center w-8 h-8 ${[, 'รอการตรวจสอบ', 'อนุมัติการชำระเงิน', "กำลังดำเนินการส่งสินค้า", 'สำเร็จ',].includes(payment.status) ? 'bg-green-300 ring-green-300' : 'bg-gray-400 ring-gray-400'} rounded-full -start-4 ring-4  `}>
                                1
                            </span>
                            <h3 className="font-medium leading-tight">ส่งรายละเอียดการชำระเงิน</h3>

                        </li>
                        <li className="mb-10 ms-6">
                            <span className={`absolute flex items-center justify-center w-8 h-8 ${[, 'รอการตรวจสอบ', 'อนุมัติการชำระเงิน', "กำลังดำเนินการส่งสินค้า", 'สำเร็จ',].includes(payment.status) ? 'bg-green-300 ring-green-300' : 'bg-gray-400 ring-gray-400'} rounded-full -start-4 ring-4  `}>
                                2
                            </span>
                            <h3 className="font-medium leading-tight">รอการตรวจสอบการชำระเงิน</h3>

                        </li>
                        <li className="mb-10 ms-6">
                            <span className={`absolute flex items-center justify-center w-8 h-8 ${['อนุมัติการชำระเงิน', "กำลังดำเนินการส่งสินค้า", 'สำเร็จ',].includes(payment.status) ? 'bg-green-300 ring-green-300' : 'bg-gray-400 ring-gray-400'} rounded-full -start-4 ring-4  `}>
                                3
                            </span>
                            <h3 className="font-medium leading-tight">อนุมัติการชำระเงิน</h3>

                        </li>
                        <li className="mb-10 ms-6">
                            <span className={`absolute flex items-center justify-center w-8 h-8 ${["กำลังดำเนินการส่งสินค้า", 'สำเร็จ',].includes(payment.status) ? 'bg-green-300 ring-green-300' : 'bg-gray-400 ring-gray-400'} rounded-full -start-4 ring-4  `}>
                                4
                            </span>
                            <h3 className="font-medium leading-tight">กำลังดำเนินการขนส่งสินค้า</h3>

                        </li>
                        <li className="mb-10 ms-6">
                            <span className={`absolute flex items-center justify-center w-8 h-8 ${['สำเร็จ',].includes(payment.status) ? 'bg-green-300 ring-green-300' : 'bg-gray-400 ring-gray-400'} rounded-full -start-4 ring-4  `}>
                                5
                            </span>
                            <h3 className="font-medium leading-tight">สำเร็จ</h3>

                        </li>

                    </ol>


                </div>
            </div>
            <div>
                <h1>หลักฐานการชำระเงิน</h1>
                <img
                    src={`http://${backendip}:3000/uploads/${payment.paymentImage}`}
                    alt={payment.name}
                    className="object-cover mr-4"
                    style={{ width: '300px', height: '300px' }} // Adjust width and height as needed
                />
            </div>
        </div>
    );
};

export default BuyDetail;