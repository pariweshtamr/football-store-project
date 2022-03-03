import styled from 'styled-components'

export const ProductListScreenContainer = styled.div``
export const Title = styled.h1`
  margin: 20px;
  padding-left: 20px;
  font-weight: bolder;
`
export const Hr = styled.div`
  width: 95vw;
  height: 1px;
  color: teal;
  margin: 0 auto;
`

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
export const Filter = styled.div`
  padding: 0 20px;
  margin: 20px;
`
export const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;

  @media screen and (max-width: 600px) {
    margin-right: 16px;
  }
`
export const ProductListSelect = styled.select`
  padding: 10px;
  margin-right: 20px;
  border: 1px teal solid;
  background-color: #fff;

  @media screen and (max-width: 600px) {
    margin: 10px 0;
  }
`
export const Option = styled.option``
