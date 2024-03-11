import { useState } from 'react'
import '../App.css'
import { ComplexNavbar } from '../components/NavBar'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { Button } from "@material-tailwind/react";
function HomePage() {


    return (
        <>
           <ComplexNavbar/>
            <section>
            <Carousel autoPlay={true} interval={5000} infiniteLoop={true} showArrows={false}  showStatus={false}>
            <div className="bg-[#C1C4B4] py-8 flex flex-col lg:flex-row items-center justify-center">
                    {/* Left side content */}
                    <div className="lg:w-1/2 lg:order-first  lg:text-left px-4   ">
                        <h1 className="text-black text-3xl font-bold mb-4">มีปัญหากับเครื่องใช้ไฟฟ้า?</h1>
                        <h1 className="text-[#A98962] text-3xl font-bold mb-4">ไม่ต้องกังวล!</h1>
                        <p className="text-black text-lg">เรามีทีมผู้เชี่ยวชาญพร้อมรับซ่อมทุกปัญหา!</p>
                        <div className="text-center  mt-12 lg:text-left">
                            <button className="bg-white text-black-500 px-2 py-2 rounded-md ">ดูเพิ่มเติม </button>
                        </div>


                    </div>

                    {/* Right side content */}
                    <div className="w-1/4 lg:order-last">
                        <img src="banner-img.png" alt="Your Image" className="w-full h-auto" />
                    </div>
                </div>
                <div className="bg-[#C1C4B4] py-8 flex flex-col lg:flex-row items-center justify-center">
                    {/* Left side content */}
                    <div className="lg:w-1/2 lg:order-first  lg:text-left px-4   ">
                        <h1 className="text-black text-3xl font-bold mb-4">เครื่องไฟฟ้าเก่าไม่รู้จะเอาไว้ไหน</h1>
                        <h1 className="text-[#A98962] text-3xl font-bold mb-4">ไม่ต้องกังวล!</h1>
                        <p className="text-black text-lg">เรามีบริการรับซื้อเครื่องใช้ไฟฟ้าทุกชนิด!</p>
                        <div className="text-center  mt-12 lg:text-left">
                            <button className="bg-white text-black-500 px-2 py-2 rounded-md ">ดูเพิ่มเติม </button>
                        </div>


                    </div>

                    {/* Right side content */}
                    <div className="w-1/4 lg:order-last">
                        <img src="banner-img.png" alt="Your Image" className="w-full h-auto" />
                    </div>
                </div>
                </Carousel>
           
                <div className="bg-[#fff] ">
                    {/* Left side content */}
                    <div className='text-center pt-6 pb-6'> <h1 className=' text-3xl font-bold text-black'>เกี่ยวกับเรา</h1></div>
                    <div className='py-8 flex-col lg:flex-row flex items-center justify-center'>
                        <div className="w-1/4 lg:order-last">
                            <img src="banner-img.png" alt="Your Image" className="w-full h-auto" />

                        </div>
                        <div className=" w-1/2 sm:w-4/4 lg:order-last flex items-center justify-center">
                            <div className=" p-8">
                                <h1 className="text-[#A98962] text-3xl font-bold mb-4">เราคือใคร?</h1>

                                <p className="text-black text-lg">เราคือเว็บไซต์ที่จะทำให้เครื่องใช้ไฟฟ้าที่ไร้ชีวิตกลับมาอีกครั้ง <br/>เพื่อลดขยะอิเล็กทรอนิกส์
                                    และ รักษาโลกเราให้น่าอยู่เหมือนเดิม</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#fff] ">
                    {/* Left side content */}

                    <div className='py-8 flex-col lg:flex-row flex items-center justify-center'>

                        <div className=" w-1/2 sm:w-4/4 lg:order-last flex items-center justify-center">
                            <div className=" p-8">
                                <h1 className="text-[#A98962] text-3xl font-bold mb-4">ทำอย่างไร?</h1>

                                <p className="text-black text-lg">เราเปิดรับซื้อขยะอิเล็กทรอนิกส์ <br/>และนำไปขายต่อในราคาที่ไม่ว่าใครก็สามารถมีเครื่องใช้ไฟฟ้าในบ้านได้</p>
                            </div>
                        </div>
                        <div className="w-1/4 lg:order-last">
                            <img src="banner-img.png" alt="Your Image" className="w-full h-auto" />

                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default HomePage
