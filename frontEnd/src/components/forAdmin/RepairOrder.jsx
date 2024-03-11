import React, { useState, useEffect } from 'react';
import backendip from "../../../backendip";
import axios from "axios";

const RepairOrder = () => {
    const [repairs, setRepairs] = useState([]);
    const [editingRepairId, setEditingRepairId] = useState(null);
    const [editedStatus, setEditedStatus] = useState('');
    const [currentStatus, setCurrentStatus] = useState('all');

    // Function to fetch user by ID
    const getUserById = async (userId) => {
        try {
            const response = await axios.get(`http://${backendip}:3000/get-user/${userId}`);
            return response.data.user;
        } catch (error) {
            console.error("Error fetching user:", error);
            return null;
        }
    };

    // Function to fetch repairs data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://" + backendip + ":3000/get-repair");
                const repairsData = response.data.repairs;

                const repairsWithUser = await Promise.all(repairsData.map(async (repair) => {
                    const user = await getUserById(repair.userId);
                    return { ...repair, user };
                }));

                setRepairs(repairsWithUser);
            } catch (error) {
                console.error("Error fetching repairs:", error);
            }
        };

        fetchData();
    }, []);

    // Function to handle status change
    const handleStatusChange = async (repairId, newStatus) => {
        try {
          
            await axios.put(`http://${backendip}:3000/update-repair/${repairId}`, { status: newStatus });
        
            setRepairs((prevRepairs) =>
                prevRepairs.map((repair) =>
                    repair._id === repairId ? { ...repair, status: newStatus } : repair
                )
            );
            // Clear the editing state
            setEditingRepairId(null);
            setEditedStatus('');
        } catch (error) {
            console.error("Error updating repair status:", error);
        }
    };

    // Function to filter repairs by status
    const filteredRepairs = repairs.filter((repair) => {
        if (currentStatus === 'all') {
            return true;
        }
        return repair.status === currentStatus;
    });

    return (
        <>
            <div className='flex flex-col w-full h-full bg-white'>
                <div className='flex flex-col w-full'>
                    {/* Tab bar for filtering by status */}
                    <div className="flex justify-center mb-4">
                        <button
                            className={`px-4 py-2 mx-2 rounded-md ${currentStatus === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setCurrentStatus('all')}
                        >
                            ทั้งหมด
                        </button>
                        <button
                            className={`px-4 py-2 mx-2 rounded-md ${currentStatus === 'รอการตรวจสอบ' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setCurrentStatus('รอการตรวจสอบ')}
                        >
                            รอการตรวจสอบ
                        </button>
                        <button
                            className={`px-4 py-2 mx-2 rounded-md ${currentStatus === 'เดินทาง' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setCurrentStatus('เดินทาง')}
                        >
                            เดินทาง
                        </button>
                        <button
                            className={`px-4 py-2 mx-2 rounded-md ${currentStatus === 'ซ่อม' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setCurrentStatus('ซ่อม')}
                        >
                            ซ่อม
                        </button>
                        <button
                            className={`px-4 py-2 mx-2 rounded-md ${currentStatus === 'ส่งคืน' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setCurrentStatus('ส่งคืน')}
                        >
                            ส่งคืน
                        </button>
                        <button
                            className={`px-4 py-2 mx-2 rounded-md ${currentStatus === 'เสร็จสิ้น' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setCurrentStatus('เสร็จสิ้น')}
                        >
                            เสร็จสิ้น
                        </button>
                        <button
                            className={`px-4 py-2 mx-2 rounded-md ${currentStatus === 'ไม่อนุมัติเนื่องจากไม่อยู่ในเขตให้บริการ' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setCurrentStatus('ไม่อนุมัติเนื่องจากไม่อยู่ในเขตให้บริการ')}
                        >
                            ไม่อนุมัติเนื่องจากไม่อยู่ในเขตให้บริการ
                        </button>
                        {/* Add buttons for other statuses */}
                    </div>

                    {/* Render filtered repairs */}
                    {filteredRepairs.map((repair) => (
                        <div className='flex flex-row justify-between border-b-2 border-solid border-black py-6 px-4' key={repair._id}>
                            <div className='flex flex-col w-1/2 gap-2'>
                                <p>จากผู้ใช้ : {repair.user?.firstName} {repair.user?.lastName}</p>
                                <p>เบอร์โทร: {repair.tel} </p>
                                <p>ที่อยู่: {repair.address}</p>
                                <p>Name: {repair.name}</p>
                                <p>รายละเอียด: {repair.description}</p>
                                <p>{repair.repairImage}</p>
                                {/* Render select dropdown for status */}
                                {editingRepairId === repair._id ? (
                                    <div className="flex gap-2">
                                        <select
                                            value={editedStatus}
                                            onChange={(e) => setEditedStatus(e.target.value)}
                                            className="border border-gray-300 rounded-lg px-3 py-1"
                                        >
                                            <option value="รอการตรวจสอบ">รอการตรวจสอบ</option>
                                            <option value="เดินทาง">เดินทาง</option>
                                            <option value="ซ่อม">ซ่อม</option>
                                            <option value="ส่งคืน">ส่งคืน</option>
                                            <option value="เสร็จสิ้น">เสร็จสิ้น</option>
                                            <option value="ไม่อนุมัติเนื่องจากไม่อยู่ในเขตให้บริการ">ไม่อนุมัติเนื่องจากไม่อยู่ในเขตให้บริการ</option>
                                        </select>
                                        <button
                                            onClick={() => handleStatusChange(repair._id, editedStatus)}
                                            className="px-3 py-1 bg-green-500 text-white rounded-md"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditingRepairId(null);
                                                setEditedStatus('');
                                            }}
                                            className="px-3 py-1 bg-red-500 text-white rounded-md"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <p>สถานะ: {repair.status}</p>
                                        <button
                                            onClick={() => {
                                                setEditingRepairId(repair._id);
                                                setEditedStatus(repair.status);
                                            }}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )}
                            </div>
                            <img src={`http://${backendip}:3000/uploads/${repair.repairImage}`} className='w-40 h-40' />

                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default RepairOrder;
