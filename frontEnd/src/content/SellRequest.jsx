import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../App.css';
import backendip from '../../backendip';
import { ComplexNavbar } from '../components/NavBar';
import { useSelector } from 'react-redux';
function SellRequest() {

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
    // If the input is of type file, update the state with the selected file
    if (name === 'image') {
      const selectedFile = files[0];
      setFormData({ ...formData, [name]: selectedFile });
      setImageUrl(URL.createObjectURL(selectedFile)); // Create URL for the selected image
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
    formDataToSend.append('offerImage', formData.image);
    formDataToSend.append('address', formData.address);
    formDataToSend.append("userId", user_id)

    try {
      const response = await axios.post('http://' + backendip + ':3000/post-offer', formDataToSend, {
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
      // Reset form fields after successful submission
      setFormData({
        name: '',
        tel: '',
        description: '',
        address: '',
        image: null // Store file object here
      });
      setImageUrl(''); // Clear image URL
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

      <div className="flex justify-center items-center">



        <div className="w-full  pt-10 pl-20 pr-20">
          <div className=' text-center'> <h2 className="text-2xl font-semibold mb-4">เสนอขายเครื่องใช้ไฟฟ้า</h2>
            <p className="text-gray-600">กรุณากรอกรายละเอียดของสินค้าที่ต้องการเสนอขายด้านล่าง โปรดตรวจสอบให้แน่ใจว่าข้อมูลที่กรอกถูกต้องและครบถ้วน</p></div>

          {/* projgress */}
          <div className='mx-auto  text-center'>

            <ol className="mx-auto flex items-center p-3 space-x-2 text-sm font-medium justify-center content-center   rounded-lg shadow-sm  sm:text-base  sm:p-4 sm:space-x-4 rtl:space-x-reverse">
              <li className="flex items-center text-blue-600 dark:text-blue-500">
                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                  1
                </span>
                ส่งรายละเอียด <span className="hidden sm:inline-flex sm:ms-2"></span>
                <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                </svg>
              </li>
              <li className="flex items-center">
                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                  2
                </span>
                รอยืนยัน <span className="hidden sm:inline-flex sm:ms-2"></span>
                <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                </svg>
              </li>
              <li className="flex items-center">
                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                  3
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
                type="text"
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
              {/* Display selected image */}
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

        </div>

      </div>
      <div className='text-center pl-20 pr-20'>
        <h2 className="text-2xl font-semibold mb-4 mt-20 ">นโยบายการให้บริการรับซื้อเครื่องใช้ไฟฟ้า</h2>
        <p className="text-gray-600">เพื่อให้ลูกค้าทราบถึงนโยบายการให้บริการของเราในการรับซื้อสินค้า สิ่งที่เรามีให้บริการคือการรองรับคำขอส่งสินค้ามาที่เราและรอให้เราติดต่อกลับไปเพื่อการประสานงานเพิ่มเติม เมื่อเราติดต่อกลับไปเราจะจัดการในการรับสินค้าตามที่ลูกค้าระบุไว้ในที่อยู่ที่ลูกค้ากำหนดให้เรา หากมีข้อสงสัยเพิ่มเติมหรือต้องการข้อมูลเพิ่มเติม ลูกค้าสามารถติดต่อเราได้ผ่านช่องทางติดต่อที่เรามีให้บริการ ขอบคุณที่ให้ความสนใจในการใช้บริการของเราและเรายินดีที่จะให้บริการคุณในทุกขั้นตอนของกระบวนการรับซื้อสินค้าของคุณ</p>
      </div>
    </>
  );
}

export default SellRequest;
