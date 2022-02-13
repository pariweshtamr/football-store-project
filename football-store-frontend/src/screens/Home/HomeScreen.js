import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Announcement from '../../components/Announcement/Announcement'
import Banner from '../../components/Banner/Banner'
import Categories from '../../components/Category/Categories'
import { autoLogin } from '../../redux/User/UserAction'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn } = useSelector((state) => state.user)

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(autoLogin())
    }

    isLoggedIn && navigate('/', { replace: true })
  }, [isLoggedIn, navigate, dispatch])
  return (
    <>
      <Announcement />
      <Banner />
      <Categories />
    </>
  )
}

export default HomeScreen
