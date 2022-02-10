import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ProductsContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
export const ProductsListContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`
export const ProductItemContainer = styled.div`
  flex: 1;
  margin: 5px;
  max-width: 25rem;
  height: 40rem;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  cursor: pointer;
`
export const ProductItemImage = styled.img`
  max-width: 22rem;
  height: 100%;
  border-radius: 10px;
`
export const ProductItemInfo = styled.div`
  margin-top: 1rem;
  > h2 {
    font-size: 1rem;
  }
`
export const ProductItemPrice = styled.div`
  font-size: 2rem;
`
export const ProductLink = styled(Link)`
  text-decoration: none;
  color: teal;

  &:hover {
    color: #000;
  }
`
