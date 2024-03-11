import { useState } from "react";
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import backendip from "../../../backendip";
const SellDetail = ({ offer, onBack }) => {
    const user = useSelector(state => state.user);
    const userId = user.user?.user?._id;
    console.log(userId)
    // Mock data for product details
    //  1. รอการตรวจสอบ 2. เดินทางไปที่อยู่ลูกค้า 3.สำเร็จ 4. ไม่อนุมัติเนื่องจากไม่อยู่ในเขตให้บริการ 

    return (
        <div>
            <div className="flex items-center mb-4">
                <button onClick={onBack} className="mr-2 text-blue-500 hover:underline">ย้อนกลับ</button>

            </div>
            <p className="flex-end">รหัส {offer._id}</p>
            <h1 className="text-2xl font-bold">ชื่อ: {offer.name}</h1>

            <p className="">รายละเอียด{offer.description}</p>
            <h1 className="text-xl font-bold">ติดต่อ</h1>
            <p className="">ที่อยู่{offer.address}</p>
            <p className="">เบอร์โทรศัพท์{offer.tel}</p>


            <h3>รูปสินค้า</h3>
            <div className="flex items-center">

                <img
                    src={`http://${backendip}:3000/uploads/${offer.offerImage}`}
                    alt={offer.name}
                    className="object-cover mr-4"
                    style={{ width: '300px', height: '300px' }} // Adjust width and height as needed
                />
                <div>



                </div>
                <div className="mx-auto justify-center">
                    <h1 className={`text-3xl ${offer.status === 'ไม่อนุมัติเนื่องจากไม่อยู่ในเขตให้บริการ' ? 'text-red-500' : 'text-gray-600'}`}>สถานะการเสนอขาย: {offer.status}</h1>

                    <ol className="relative border-s border-gray-200 dark:border-gray-200 dark:text-gray-800 mt-10">
                        <li className="mb-10 ms-6">
                            <span className={`absolute flex items-center justify-center w-8 h-8 ${['รอการตรวจสอบ', 'เดินทางไปที่อยู่ลูกค้า', "สำเร็จ",].includes(offer.status) ? 'bg-green-300 ring-green-300' : 'bg-gray-400 ring-gray-400'} rounded-full -start-4 ring-4  `}>
                                1
                            </span>
                            <h3 className="font-medium leading-tight">ส่งรายละเอียดการเสนอขาย</h3>

                        </li>
                        <li className="mb-10 ms-6">
                            <span className={`absolute flex items-center justify-center w-8 h-8 ${['รอการตรวจสอบ', 'เดินทางไปที่อยู่ลูกค้า', "สำเร็จ",].includes(offer.status) ? 'bg-green-300 ring-green-300' : 'bg-gray-400 ring-gray-400'} rounded-full -start-4 ring-4  `}>
                                2
                            </span>
                            <h3 className="font-medium leading-tight">รอการตรวจสอบ</h3>

                        </li>
                        <li className="mb-10 ms-6">
                            <span className={`absolute flex items-center justify-center w-8 h-8 ${[ 'เดินทางไปที่อยู่ลูกค้า', "สำเร็จ",].includes(offer.status) ? 'bg-green-300 ring-green-300' : 'bg-gray-400 ring-gray-400'} rounded-full -start-4 ring-4  `}>
                                3
                            </span>
                            <h3 className="font-medium leading-tight">เดินทางไปที่อยู่ลูกค้า</h3>

                        </li>
                        <li className="mb-10 ms-6">
                            <span className={`absolute flex items-center justify-center w-8 h-8 ${["สำเร็จ",].includes(offer.status) ? 'bg-green-300 ring-green-300' : 'bg-gray-400 ring-gray-400'} rounded-full -start-4 ring-4  `}>
                                4
                            </span>
                            <h3 className="font-medium leading-tight">สำเร็จ</h3>

                        </li>


                    </ol>


                </div>
            </div>

        </div>
    );
};

export default SellDetail;