import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"

const Options ={
    edit:false,
}

const Product = ({ product }) =>{
  return (
    <div>
    <Link className='productCard' to={product._id}>
    {product.images && product.images[0] && (
      <img src={product.images[0].url} alt={product.name} />
    )}
    <p>{product.name}</p>
    <div>
        <ReactStars {...Options} />
        <span>(255 Reviews)</span>
    </div>
    <span>{product.price}</span>
    </Link>  
    </div>
  )
}

export default Product
