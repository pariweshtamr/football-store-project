import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
  border: 1px solid teal;
  width: 100%;
  padding: 10px 20px;
  margin: 2rem 0;
  border-radius: 5px;
  box-shadow: 5px 10px 20px grey;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
  text-decoration: underline;
`

export const Details = styled.div`
  span {
    font-weight: 400;
  }

  > div {
    font-weight: 500;
  }
`

export const Button = styled(Link)`
  width: 100%;
  margin: 20px 0;
  border: none;
  border-radius: 5px;
  padding: 15px;
  background-color: #ffc107e3;
  color: black;
  cursor: pointer;
  text-decoration: none;
`
