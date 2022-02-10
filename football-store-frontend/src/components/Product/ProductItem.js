import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '../Rating/Rating'
import {
  ProductItemContainer,
  ProductItemImage,
  ProductItemInfo,
  ProductItemPrice,
} from './ProductStyles'

const ProductItem = ({ product }) => {
  return (
    <ProductItemContainer>
      <Link to={`/product/${product._id}`}>
        <ProductItemImage src={product.image} alt={product.name} />
        <ProductItemInfo>
          <h2>{product.name}</h2>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          <ProductItemPrice>${product.price}</ProductItemPrice>
        </ProductItemInfo>
      </Link>
    </ProductItemContainer>
  )
}

export default ProductItem
