import React, { useState } from 'react';


const RepairOrder = () => {
    return (
        <>
            <div className='flex flex-col w-full h-full bg-white'>
                <div className='flex flex-col w-full'>
                    <div className='flex flex-row justify-between border-b-2 border-solid border-black py-6 px-4'>
                        <div className='flex flex-col w-1/2 gap-2'>
                            <p>ชื่อ: นามสกุล:</p>
                            <p>เบอร์โทร: </p>
                            <p>Repair_ID:</p>
                            <p>ส่ง อันนี้ ซ่อม</p>
                        </div>
                        <div className='flex flex-col mr-10 justify-center'>
                            <button className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2">View</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RepairOrder;