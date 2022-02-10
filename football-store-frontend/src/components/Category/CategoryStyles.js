import styled from 'styled-components'
import { mobile } from '../../responsive'

export const Container = styled.div`
  display: flex;
  padding: 5px;
  justify-content: center;
  align-items: center;

  ${mobile({ padding: '0px', flexDirection: 'column', marginTop: '30px' })}
`

export const CategoriesContainer = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
`

export const CategoryContainer = styled.div`
  display: flex;
`

export const CategoryItemContainer = styled.div`
  flex: 1;
  margin: 2px;
  height: 60vh;
  justify-content: space-between;

  position: relative;
`
export const CategoryItemImage = styled.img`
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
`
export const CategoryItemInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 1rem;
`
export const CategoryItemTitle = styled.h1`
  color: #fff;
  margin-bottom: 20px;
`
export const CategoryItemButton = styled.button`
  border: none;
  padding: 10px;
  background-color: #fff;
  color: #000;
  cursor: pointer;
  font-weight: 600;
`
