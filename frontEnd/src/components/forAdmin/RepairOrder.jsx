import React, { useState, useEffect } from 'react';
import backendip from "../../../backendip";
import axios from "axios";


const RepairOrder = () => {
    const [repairs, setRepairs] = useState([]);

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

    return (
        <>
            <div className='flex flex-col w-full h-full bg-white'>
                <div className='flex flex-col w-full'>
                    {repairs.map((repair) => (
                        <div className='flex flex-row justify-between border-b-2 border-solid border-black py-6 px-4' key={repair._id}>
                            <div className='flex flex-col w-1/2 gap-2'>
                                <p>จากผู้ใช้ : {repair.user?.firstName} {repair.user?.lastName}</p>
                                <p>เบอร์โทร: {repair.tel} </p>
                                <p>ที่อยู่: {repair.address}</p>
                                <p>Name: {repair.name}</p>
                                <p>รายละเอียด: {repair.description}</p>
                                <p>สถานะ: {repair.status}</p>
                            </div>
                            <div className='flex flex-col mr-10 justify-center'>
                                <button className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2">View</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default RepairOrder;