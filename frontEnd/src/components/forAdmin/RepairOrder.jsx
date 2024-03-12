import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backendip from "../../../backendip";
import Swal from 'sweetalert2';

const RepairOrder = () => {
    const [repairs, setRepairs] = useState([]);
    const [editingRepairId, setEditingRepairId] = useState(null);
    const [editedStatus, setEditedStatus] = useState('');
    const [currentStatus, setCurrentStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

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
            console.log("eee", newStatus)
        
            const formData = new URLSearchParams();
            formData.append('status', newStatus);
            const response = await axios.put(`http://${backendip}:3000/update-repair/${repairId}`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (response.status === 200) {
                setRepairs((prevRepairs) =>
                    prevRepairs.map((repair) =>
                        repair._id === repairId ? { ...repair, status: newStatus } : repair
                    )
                );
                Swal.fire({
                    icon: "success",
                    title: "Update success",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
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

    // Function to handle search input changes
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter repairs based on search query
    const searchedRepairs = filteredRepairs.filter((repair) =>
        repair.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-center mb-4">
                {/* Tab bar for filtering by status */}
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
                        <th scope="col" className="px-6 py-3">User</th>
                        <th scope="col" className="px-6 py-3">Tel</th>
                        <th scope="col" className="px-6 py-3">Address</th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Description</th>
                        <th scope="col" className="px-6 py-3">Image</th> {/* Add Image column */}
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {searchedRepairs.map((repair) => (
                        <tr key={repair._id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4">{repair.user?.firstName} {repair.user?.lastName}</td>
                            <td className="px-6 py-4">{repair.tel}</td>
                            <td className="px-6 py-4">{repair.address}</td>
                            <td className="px-6 py-4">{repair.name}</td>
                            <td className="px-6 py-4">{repair.description}</td>
                            <td className="px-6 py-4"> {/* Add Image column */}
                                <img src={`http://${backendip}:3000/uploads/${repair.repairImage}`} className="w-16 md:w-32 max-w-full max-h-full" alt="Repair" />
                            </td>
                            <td className="px-6 py-4">
                                {editingRepairId === repair._id ? (
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
                                ) : (
                                    repair.status
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {editingRepairId === repair._id ? (
                                    <>
                                        <button
                                            onClick={() => handleStatusChange(repair._id, editedStatus)}
                                            className="px-3 py-1 bg-green-500 text-white rounded-md mr-2"
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
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setEditingRepairId(repair._id)}
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
    );
};

export default RepairOrder;
