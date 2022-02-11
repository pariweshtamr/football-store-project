import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mobile } from '../../responsive'

export const ProductContainer = styled.div``

export const BackLink = styled(Link)`
  text-decoration: none;
  margin: 2rem;
  color: teal;
`
export const LinkContainer = styled.div`
  margin-top: 2rem;
`
export const ProductWrapper = styled.div`
  padding: 30px;
  display: flex;
  ${mobile({ flexDirection: 'column', padding: '10px' })}
`
export const ImgContainer = styled.div`
  flex: 1;
`
export const Image = styled.img`
  width: 100%;

  ${mobile({ margin: '20px 0' })}
`
export const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;

  ${mobile({ padding: '0 10px' })}
`
export const ProductTitle = styled.h1`
  font-weight: 300;
`
export const ProductDescription = styled.p`
  margin: 20px 0;
`
export const ProductPrice = styled.div`
  font-weight: 100;
  font-size: 40px;
`
export const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;

  ${mobile({ width: '100%' })}
`
export const QtyContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`
export const SizeContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`
export const Quantity = styled.select`
  padding: 0.4rem;
  width: 5rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  border: 0.1rem teal solid;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`
export const Size = styled.select`
  padding: 0.4rem;
  width: 5rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  border: 0.1rem teal solid;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`
export const FilterSizeOption = styled.option``
export const FilterQuantityOption = styled.div``
export const Option = styled.option``
export const Button = styled.button`
  padding: 10px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #f8f4f4;
  }
`
export const Unavailable = styled.div`
  color: red;
  font-size: 1.5rem;
  font-weight: lighter;
`
