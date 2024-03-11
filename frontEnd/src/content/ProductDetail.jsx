import { useState } from 'react'
import '../App.css'
import { useParams } from 'react-router-dom'
import { ComplexNavbar } from '../components/NavBar'

function ProductDetail() {
  const [count, setCount] = useState(0)
  const { productId } = useParams()
  return (
    <>
      <ComplexNavbar/>
      <div className='flex flex-row w-screen h-screen items-center'>
        <div class='flex flex-col w-[60%] h-[60%] justify-center items-center ml-96 bg-gray-400 rounded-3xl'>
          <img
            src='https://www.electrolux.co.th/globalassets/catalog/washing-machines--washer-dryers/th-ewf7524d3wb-fr-cl-1500x1500.png'
            alt='product'
            class='object-contain w-full h-full rounded-3xl'
          />
        </div>
        <div className='flex flex-col h-1/2 justify-center ml-20 gap-6'>
          <div className='flex flex-row w-1/2 justify-start'>
            <h1 className='text-4xl'>Product Name {productId}</h1>
          </div>
          <div className='flex flex-col w-1/2 h-full px-6 py-6 justify-evenly bg-gray-200 rounded-3xl border-2 border-solid border-black'>
            <p>Description</p>
            <p className='px-2 py-2'>Import Material Design Icons, FontAwesome, Jam Icons, EmojiOne, Twitter Emoji and many other icons (more than 100 icon sets containing over 100,000 icons) to Figma document as vector shapes.</p>
            <p>ประเภท</p>
            <p className='px-2 py-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. A architecto repellendus reprehenderit laborum dignissimos velit totam aperiam molestias quo. Aspernatur accusantium eligendi dolorem maxime harum fuga suscipit atque quod rerum.</p>
            <div className='flex flex-row justify-between'>
              <div className='px-2 py-2'>
                <p className='text-2xl'>ราคา: 9999 บาท</p>
              </div>
              <div className='px-2 py-2'>
                <p className='text-2xl'>รีวิว: 4.5/5</p>
              </div>
            </div>
          </div>
          <button class='w-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg'>Buy Now</button>
        </div>


      </div>
    </>
  )
}

export default ProductDetail
