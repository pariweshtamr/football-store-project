import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mobile } from '../../responsive'

export const CartContainer = styled.div``
export const ShopLink = styled(Link)`
  text-decoration: none;
  color: teal;
`
export const ProductLink = styled(Link)`
  text-decoration: none;
  color: teal;
`
export const CartWrapper = styled.div`
  padding: 20px;

  ${mobile({ padding: '10px' })}
`
export const CartTitle = styled.h1`
  font-weight: 300;
  text-align: center;
  text-decoration: underline;
  text-decoration-color: teal;
`
export const CartTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 0px;

  ${mobile({ padding: '5px', margin: '20px 0' })}
`
export const CartTopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;

  ${mobile({ padding: '5px', fontSize: '13px' })}
`
export const CartTopTexts = styled.div`
  display: flex;
`
export const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 35px;

  ${mobile({ display: 'none' })}
`
export const CartBottom = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection: 'column' })}
`
export const CartProductInfo = styled.div`
  flex: 3;
  margin-right: 1rem;

  ${mobile({ marginBottom: '40px' })}
`
export const CartProduct = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection: 'column' })}
`
export const CartProductDetails = styled.div`
  display: flex;
  flex: 2;
`
export const CartProductImage = styled.img`
  width: 200px;
  height: 200px;
`
export const CartProductDescription = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const CartProductName = styled.span``

export const CartPriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const CartProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`
export const CartProductQty = styled.span`
  font-size: 24px;
  margin: 0px 20px;

  ${mobile({ margin: '0px 15px' })}
`
export const CartProductSize = styled.select`
  font-size: 24px;
  margin: 10px;

  ${mobile({ margin: '0px 15px' })}
`
export const CartProductInfoTitle = styled.div`
  font-weight: bolder;
  margin-left: 10px;
`
export const FilterCartQtyOption = styled.option``
export const FilterCartSizeOption = styled.option``

export const CartProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`
export const CartActionButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const RemoveButton = styled.button`
  max-height: 3rem;
  padding: 10px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #f8f4f4;
  }
`
export const Hr2 = styled.hr`
  background-color: #1a1a1a;
  border: none;
  height: 1px;
  width: 90%;
`
export const CartSummary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 5px;
  padding: 20px;
  height: 60vh;
`
export const CartSummaryTitle = styled.h2`
  font-weight: 300;
  display: flex;
  justify-content: center;
`
export const CartSummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '600'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`
export const CartSummaryItemText = styled.span`
  font-weight: ${(props) => props.type === 'total' && '500'};
`
export const CartSummaryItemPrice = styled.span``

export const CartSummaryItemDiscount = styled.span`
  color: red;
`
export const CartSummaryButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
`
export const ClearCartButton = styled.button`
  width: 200px;
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
`
