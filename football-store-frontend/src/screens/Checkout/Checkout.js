import React from 'react'
import { Form, Button, Col, Row, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginLink } from '../Register/RegisterScreenStyles'

const Checkout = () => {
  const navigate = useNavigate()

  const { isLoggedIn } = useSelector((state) => state.user)

  const addressRef = useRef()
  const countryRef = useRef()
  const cityRef = useRef()
  const postalCodeRef = useRef()

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('shippingAddress'))) {
      const { address, postalCode, country, city } = JSON.parse(
        localStorage.getItem('shippingAddress'),
      )

      addressRef.current.value = address
      cityRef.current.value = city
      countryRef.current.value = country
      postalCodeRef.current.value = postalCode
    }
  }, [])

  const checkoutHandler = (e) => {
    e.preventDefault()
    console.log('click')

    if (
      !addressRef.current?.value ||
      !countryRef.current?.value ||
      !cityRef.current?.value ||
      !postalCodeRef.current?.value
    ) {
      console.log('clicked')
      return
    }

    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        address: addressRef.current.value,
        country: countryRef.current.value,
        city: cityRef.current.value,
        postalCode: postalCodeRef.current.value,
      }),
    )

    navigate('/cart/checkout/order')
  }
  return (
    <>
      {isLoggedIn ? (
        <div
          style={{
            maxWidth: '40%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Container style={{ alignItems: 'center' }}>
            <Form>
              <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" ref={addressRef} />
              </Form.Group>

              <Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Country</Form.Label>
                  <Form.Control ref={countryRef} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control ref={cityRef} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control ref={postalCodeRef} />
                </Form.Group>
              </Row>

              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginRight: '20px' }}
                  onClick={checkoutHandler}
                >
                  Continue To Order
                </Button>
              </div>
            </Form>
          </Container>
        </div>
      ) : (
        <div>
          <div style={{ width: '40%', marginLeft: '30%', marginTop: '5%' }}>
            <h4 onClick={checkoutHandler}>Please Sign In To Proceed!</h4>
          </div>
          <div>
            <LoginLink to="/login">
              <i className="fa">L O G I N</i>
            </LoginLink>
          </div>
        </div>
      )}
    </>
  )
}

export default Checkout
