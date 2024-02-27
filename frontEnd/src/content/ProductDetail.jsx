import { useState } from 'react'
import '../App.css'
import { useParams } from 'react-router-dom'

function ProductDetail() {
  const [count, setCount] = useState(0)
  const productId = useParams()
  return (
    <h1>ProductDetail ID:${productId}</h1>
     
  )
}

export default ProductDetail
