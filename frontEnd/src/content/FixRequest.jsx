import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../App.css';
import backendip from '../../backendip';
import { ComplexNavbar } from '../components/NavBar';
import { useSelector } from 'react-redux';

function FixRequest() {
    const user = useSelector(state => state.user);
    const user_id = user.user?.user?._id;
    const [formData, setFormData] = useState({
        name: '',
        tel: '',
        description: '',
        address: '',
        image: null // Store file object here
    });
    const [imageUrl, setImageUrl] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const selectedFile = files[0];
            setFormData({ ...formData, [name]: selectedFile });
            setImageUrl(URL.createObjectURL(selectedFile));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('tel', formData.tel);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('repairImage', formData.image);
        formDataToSend.append('address', formData.address);
        formDataToSend.append("userId", user_id);
        formDataToSend.append("status", "รอการตรวจสอบ")

        try {
            const response = await axios.post('http://' + backendip + ':3000/post-repair', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response:', response.data);
            if (response.status >= 200 && response.status < 300) {
                Swal.fire({
                    icon: "success",
                    title: "ส่งสำเร็จ",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            setFormData({
                name: '',
                tel: '',
                description: '',
                address: '',
                image: null
            });
            setImageUrl('');
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: error.response.data.error,
                showConfirmButton: false,
                timer: 1500
            });
            console.error('Error:', error);
        }
    };

    return (
        <>
            <ComplexNavbar />
            <div className="flex justify-center items-center">

                <div className="w-full pt-10 pl-20 pr-20">
                    <div className='text-center'>
                        <h2 className="text-2xl font-semibold mb-4">ขั้นตอนดำเนินการซ่อมสินค้า</h2>

                    </div>
                    <div className='flex flex-col'>
    <div className='w-full  pt-20 mx-auto justify-center flex'>

        <ol class="relative border-s border-gray-200 dark:border-gray-700 dark:text-gray-800">
            <li class="mb-10 ms-6">
                <span class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-300">
                    1
                </span>
                <h3 class="font-medium leading-tight">ส่งรายละเอียด</h3>
                <p class="text-sm">ทำการส่งรายละเอียดเครื่องใช้ไฟฟ้าที่จะใช้บริการซ่อม</p>
            </li>
            <li class="mb-10 ms-6">
                <span class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-300">
                    2
                </span>
                <h3 class="font-medium leading-tight">รอตรวจสอบ</h3>
                <p class="text-sm">ทางเราจะอ่านรายละเอียดที่คุณส่งมาและทำการติดต่อกลับไปเพื่อคุยรายละเอียดเพิ่มเติม</p>
            </li>
            <li class="mb-10 ms-6">
                <span class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-300">
                    3
                </span>
                <h3 class="font-medium leading-tight">เดินทาง</h3>
                <p class="text-sm">กำลังเดินทางไปยังที่อยู่ของคุณเพื่อดูรายละเอียดของและนำกลับมาซ่อม</p>
            </li>
            <li class="mb-10 ms-6">
                <span class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-300">
                    4
                </span>
                <h3 class="font-medium leading-tight">ซ่อม</h3>
                <p class="text-sm">ดำเนินการซ่อมเครื่องใช้ไฟฟ้าของคุณ</p>
            </li>
            <li class="mb-10 ms-6">
                <span class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-300">
                    5
                </span>
                <h3 class="font-medium leading-tight">ส่งคืน</h3>
                <p class="text-sm">การซ่อมเสร็จสื้น กำลังนำส่งคืน</p>
            </li>
            <li class="ms-6">
                <span class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-300">
                    6
                </span>
                <h3 class="font-medium leading-tight">เสร็จสิ้น</h3>
                <p class="text-sm">ได้รับเครื่องใช้ไฟฟ้าที่ซ่อมเสร็จแล้วคืน</p>
            </li>
        </ol>

    </div>
    
</div>
                    <div className='text-center'>
                        <h2 className="text-2xl font-semibold mb-4">บริการส่งซ่อมเครื่องใช้ไฟฟ้า</h2>
                        <p className="text-gray-600">กรุณากรอกรายละเอียดของสินค้าที่ต้องการซ่อมด้านล่าง โปรดตรวจสอบให้แน่ใจว่าข้อมูลที่กรอกถูกต้องและครบถ้วน</p>
                    </div>
                    <div className='mx-auto  text-center'>
                        <ol className="mx-auto flex items-center p-3 space-x-2 text-sm font-medium justify-center content-center rounded-lg shadow-sm sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
                            <li className="flex items-center text-blue-600 dark:text-blue-500">
                                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                                    1
                                </span>
                                ส่งรายละเอียด
                                <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                                </svg>
                            </li>
                            <li className="flex items-center">
                                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                                    2
                                </span>
                                รอตรวจสอบ
                                <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                                </svg>
                            </li>
                            <li className="flex items-center">
                                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                                    3
                                </span>

                                เดินทาง
                                <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                                </svg>
                            </li>
                            <li className="flex items-center">
                                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                                    4
                                </span>
                                ซ่อม
                                <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                                </svg>
                            </li>
                            <li className="flex items-center">
                                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                                    5
                                </span>
                                ส่งคืน
                                <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                                </svg>
                            </li>
                            <li className="flex items-center">
                                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                                    6
                                </span>
                                เสร็จสิ้น
                            </li>
                        </ol>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4 w-1/2 mx-auto">
                        <div>
                            <label className="block text-gray-600">ชื่อ:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">รายละเอียด:</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">ที่อยู่:</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">เบอร์โทรศัพท์:</label>
                            <input
                                type="tel"
                                name="tel"
                                value={formData.tel}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">รูปภาพ</label>
                            <input
                                type="file"
                                accept="image/*"
                                name="image"
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                            {imageUrl && (
                                <img src={imageUrl} alt="Selected" className="mt-2 max-w-full h-auto" />
                            )}
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                        >
                            ส่ง
                        </button>
                    </form>
                    <div className='text-center pl-20 pr-20 mx-auto'>
        <h2 className="text-2xl font-semibold mb-4 mt-20 ">นโยบายการให้บริการรับซ่อมสินค้า</h2>
        <p className="text-gray-600">เพื่อให้ลูกค้าทราบถึงนโยบายการให้บริการของเราในการรับซ่อมสินค้า สิ่งที่เรามีให้บริการคือการรองรับคำขอส่งสินค้ามาที่เราและรอให้เราติดต่อกลับไปเพื่อการประสานงานเพิ่มเติม เมื่อเราติดต่อกลับไปเราจะจัดการในการรับสินค้าตามที่ลูกค้าระบุไว้ในที่อยู่ที่ลูกค้ากำหนดให้เรา หากมีข้อสงสัยเพิ่มเติมหรือต้องการข้อมูลเพิ่มเติม ลูกค้าสามารถติดต่อเราได้ผ่านช่องทางติดต่อที่เรามีให้บริการ ขอบคุณที่ให้ความสนใจในการใช้บริการของเราและเรายินดีที่จะให้บริการคุณในทุกขั้นตอนของกระบวนการรับซ่อมสินค้าของคุณ</p>
    </div>
                </div>
                
            </div>
            

        </>
    );
}

export default FixRequest;
