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
  Unavailable,
  FilterSizeOption,
  Hr,
} from './ProductScreenStyles'
import { useParams } from 'react-router-dom'
import { fetchAProductById } from '../../redux/Product/ProductAction'
import { Add, Remove } from '@material-ui/icons'
import { addProductToCart } from '../../redux/Cart/CartSlice'

const ProductScreen = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState()

  const { isLoading, productResponse, selectedProduct } = useSelector(
    (state) => state.product,
  )

  const addToCartHandler = () => {
    dispatch(
      addProductToCart({
        ...selectedProduct,
        qty,
        size,
      }),
    )
  }

  useEffect(() => {
    dispatch(fetchAProductById(id))
  }, [dispatch, id])

  const handleQuantity = (type) => {
    if (type === 'decrease') {
      qty > 1 && setQty(qty - 1)
    } else {
      qty < selectedProduct.inStock && setQty(qty + 1)
    }
  }

  return (
    <>
      <Hr>
        <hr />
      </Hr>
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
                    <Remove onClick={() => handleQuantity('decrease')} />
                    <Quantity>{qty}</Quantity>
                    <Add onClick={() => handleQuantity('increase')} />
                  </QtyContainer>

                  <SizeContainer>
                    Size
                    <Size
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    >
                      {selectedProduct.size?.map((s) => (
                        <FilterSizeOption key={s}>{s}</FilterSizeOption>
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
