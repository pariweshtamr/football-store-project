import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../../components/LoadingBox/LoadingBox'
import MessageBox from '../../components/MessageBox/MessageBox'
import {
  AddContainer,
  LinkContainer,
  BackLink,
  Button,
  Image,
  ImgContainer,
  InfoContainer,
  ProductContainer,
  ProductDescription,
  ProductPrice,
  ProductTitle,
  ProductWrapper,
  QtyContainer,
  SizeContainer,
  Quantity,
  Size,
  Option,
  Unavailable,
} from './ProductScreenStyles'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchAProductById } from '../../redux/Product/ProductAction'

const ProductScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [qty, setQty] = useState(1)
  const [sizes, setSizes] = useState()

  const { isLoading, productResponse, selectedProduct } = useSelector(
    (state) => state.product,
  )

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  useEffect(() => {
    dispatch(fetchAProductById(id))
  }, [dispatch, id])

  return (
    <>
      {isLoading ? (
        <LoadingBox />
      ) : productResponse.message ? (
        <MessageBox variant="danger">{productResponse.message}</MessageBox>
      ) : (
        <ProductContainer>
          <LinkContainer>
            <BackLink to="/products">Back to product list</BackLink>
          </LinkContainer>
          <ProductWrapper>
            <ImgContainer>
              <Image src={selectedProduct.image} alt={selectedProduct.name} />
            </ImgContainer>
            <InfoContainer>
              <ProductTitle>{selectedProduct.name}</ProductTitle>
              <ProductDescription>
                {selectedProduct.description}
              </ProductDescription>
              <ProductPrice>${selectedProduct.price}</ProductPrice>

              {selectedProduct.inStock > 0 ? (
                <AddContainer>
                  <QtyContainer>
                    Qty:
                    <Quantity
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(selectedProduct.inStock).keys()].map((x) => (
                        <Option key={x + 1} value={x + 1}>
                          {x + 1}
                        </Option>
                      ))}
                    </Quantity>
                  </QtyContainer>
                  <SizeContainer>
                    Size:
                    <Size
                      value={sizes}
                      onChange={(e) => setSizes(e.target.value)}
                    >
                      {[...Array(selectedProduct.size).keys()].map((x) => (
                        <Option key={x + 1} value={x + 1}>
                          {x + 1}
                        </Option>
                      ))}
                    </Size>
                  </SizeContainer>
                  <Button onClick={addToCartHandler}>ADD TO CART</Button>
                </AddContainer>
              ) : (
                <Unavailable>Product unavailable. Coming Soon!</Unavailable>
              )}
            </InfoContainer>
          </ProductWrapper>
        </ProductContainer>
      )}
    </>
  )
}

export default ProductScreen
