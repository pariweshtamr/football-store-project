import styled from 'styled-components'

export const HistoryContainer = styled.div`
  border: 1px grey;
  width: 35rem;
  padding: 20px 10px;
  margin: 0 1rem;
  border-radius: 3px;
  box-shadow: 2px 5px 8px grey;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const HistoryTitle = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 2rem;
  font-weight: 600;
  text-decoration: underline;
`

export const NoOrder = styled.div`
  text-align: center;
  margin-top: 2rem;
`

export const OrderList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  align-content: center;
  gap: 2rem;
  padding: 2rem;
`
