import { useState } from "react";
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import backendip from "../../../backendip";
const RepairDetail = ({ productId, onBack }) => {
  const user = useSelector(state => state.user);
  const userId = user.user?.user?._id;
  // Mock data for product details
  const [repairDetail, setRepairDetail] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${backendip}:3000/get-repairs/${userId}`);
        console.log("eeiii", response.data.repairs[0])

        setRepairDetail(response.data.repairs[0]); // Assuming response.data contains the details of the selected product
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [productId]); // Fetch data when productId changes

  // รอการตรวจสอบ เดินทาง ซ่อม ส่งคืน เสร็จสิ้น
  return (
    <div>
      <div className="flex items-center mb-4">
        <button onClick={onBack} className="mr-2 text-blue-500 hover:underline">ย้อนกลับ</button>

      </div>
      <h1 className="text-2xl font-bold">{repairDetail.name}</h1>
      <p className="flex-end">รหัส {repairDetail._id}</p>
      <p className="">{repairDetail.description}</p>
      <p className={`text-sm ${repairDetail.status === 'ไม่อนุมัติเนื่องจากไม่อยู่ในเขตให้บริการ' ? 'text-red-500' : 'text-gray-600'}`}>สถานะ {repairDetail.status}</p>

      <div className="flex items-center">
        <img
          src={`http://${backendip}:3000/uploads/${repairDetail.repairImage}`}
          alt={repairDetail.name}
          className="object-cover mr-4"
          style={{ width: '300px', height: '300px' }} // Adjust width and height as needed
        />
        <div>



        </div>
        <div className="mx-auto flex justify-center">
          <ol className="relative border-s border-gray-200 dark:border-gray-200 dark:text-gray-800">
            <li className="mb-10 ms-6">
              <span className={`absolute flex items-center justify-center w-8 h-8 ${['ไม่อนุมัติเนื่องจากไม่อยู่ในเขตให้บริการ','รอการตรวจสอบ', 'เดินทาง', "ซ่อม", 'ส่งคืน', 'เสร็จสิ้น'].includes(repairDetail.status) ? 'bg-green-300 ring-green-300' : 'bg-gray-400 ring-gray-400'} rounded-full -start-4 ring-4  `}>
                1
              </span>
              <h3 className="font-medium leading-tight">ส่งรายละเอียด</h3>
              <p className="text-sm">ทำการส่งรายละเอียดเครื่องใช้ไฟฟ้าที่จะใช้บริการซ่อม</p>
            </li>
            <li className="mb-10 ms-6">
            <span className={`absolute flex items-center justify-center w-8 h-8 ${repairDetail.status === 'ไม่อนุมัติเนื่องจากไม่อยู่ในเขตให้บริการ' ? 'bg-red-400 ring-red-400' : 'bg-gray-400 ring-gray-400'} ${['รอการตรวจสอบ', 'เดินทาง', "ซ่อม", 'ส่งคืน', 'เสร็จสิ้น'].includes(repairDetail.status) ? 'bg-green-300 ring-green-300' : ''} rounded-full -start-4 ring-4  `}>
                2
              </span>
              <h3 className="font-medium leading-tight">รอการตรวจสอบ</h3>
              <p className="text-sm">ทางเราจะอ่านรายละเอียดที่คุณส่งมาและทำการติดต่อกลับไปเพื่อคุยรายละเอียดเพิ่มเติม</p>
            </li>
            <li className="mb-10 ms-6">
              <span className={`absolute flex items-center justify-center w-8 h-8 ${['เดินทาง', "ซ่อม", 'ส่งคืน', 'เสร็จสิ้น'].includes(repairDetail.status) ? 'bg-green-300 ring-green-300' : 'bg-gray-400 ring-gray-400'} rounded-full -start-4 ring-4  `}>
                3
              </span>
              <h3 className="font-medium leading-tight">เดินทาง</h3>
              <p className="text-sm">กำลังเดินทางไปยังที่อยู่ของคุณเพื่อดูรายละเอียดของและนำกลับมาซ่อม</p>
            </li>
            <li className="mb-10 ms-6">
              <span className={`absolute flex items-center justify-center w-8 h-8 ${["ซ่อม", 'ส่งคืน', 'เสร็จสิ้น'].includes(repairDetail.status) ? 'bg-green-300 ring-green-300' : 'bg-gray-400 ring-gray-400'} rounded-full -start-4 ring-4  `}>
                4
              </span>
              <h3 className="font-medium leading-tight">ซ่อม</h3>
              <p className="text-sm">ดำเนินการซ่อมเครื่องใช้ไฟฟ้าของคุณ</p>
            </li>
            <li className="mb-10 ms-6">
              <span className={`absolute flex items-center justify-center w-8 h-8 ${['ส่งคืน', 'เสร็จสิ้น'].includes(repairDetail.status) ? 'bg-green-300 ring-green-300' : 'bg-gray-400 ring-gray-400'} rounded-full -start-4 ring-4  `}>
                5
              </span>
              <h3 className="font-medium leading-tight">ส่งคืน</h3>
              <p className="text-sm">การซ่อมเสร็จสื้น กำลังนำส่งคืน</p>
            </li>
            <li className="ms-6">
              <span className={`absolute flex items-center justify-center w-8 h-8 ${['เสร็จสิ้น'].includes(repairDetail.status) ? 'bg-green-300 ring-green-300' : 'bg-gray-400 ring-gray-400'} rounded-full -start-4 ring-4  `}>
                6
              </span>
              <h3 className="font-medium leading-tight">เสร็จสิ้น</h3>
              <p className="text-sm">ได้รับเครื่องใช้ไฟฟ้าที่ซ่อมเสร็จแล้วคืน</p>
            </li>
          </ol>


        </div>
      </div>

    </div>
  );
};

export default RepairDetail;