import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './components/Page/Home/Home'
import Favorite from './components/Page/Favorite/Favorite'
import Order from './components/Page/Order/Order'
import Header from './components/Header/Header'
import Drawer from './components/Drawer/Drawer'
import Footer from './components/Footer/Footer'
import { AppContext } from './AppContext/AppContext'
import { ThemeProvider } from './ThemeContext/ThemeContext'
import {
  getCart,
  getFavorites,
  getProducts,
  addToCart,
  deleteFromCart,
  addToFavorites,
  deleteFromFavorites,
} from './utils/api'

function App() {
  const [products, setProducts] = React.useState([])
  const [cartProducts, setCartProducts] = React.useState([])
  const [favoriteCards, setFavoriteCards] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [order, setOrder] = React.useState([])

  React.useEffect(() => {
    try {
      ;(async () => {
        const cartResponse = await getCart()
        const favoritesResponse = await getFavorites()
        const productsResponse = await getProducts()
        setIsLoading(false)
        setCartProducts(cartResponse.data)
        setFavoriteCards(favoritesResponse.data)
        setProducts(productsResponse.data)
      })()
    } catch (error) {
      console.log(error)
      alert('Ошибка при загрузке данных')
    }
  }, [])

  const handleAddToCart = async (obj) => {
    try {
      const { data } = await addToCart(obj)
      setCartProducts((prev) => [...prev, data])
    } catch (error) {
      console.log(error)
      alert('Не удалось добавить в корзину')
    }
  }

  const handleDeleteFromCart = async (obj) => {
    try {
      await deleteFromCart(obj)
      const updatedCart = cartProducts.filter((item) => item.mockApiId !== obj.mockApiId)
      setCartProducts(updatedCart)
    } catch (error) {
      console.log(error)
      alert('Не удалось удалить из корзины')
    }
  }

  const handleAddFavoriteCard = async (obj) => {
    try {
      const { data } = await addToFavorites(obj)
      setFavoriteCards((prev) => [...prev, data])
    } catch (error) {
      console.log(error)
      alert('Не удалось добавить в закладки')
    }
  }

  const handleDeleteFavoriteCard = async (obj) => {
    await deleteFromFavorites(obj)
    const updatedFavorite = favoriteCards.filter((item) => item.mockApiId !== obj.mockApiId)
    setFavoriteCards(updatedFavorite)
  }

  const handleCalculateTheAmount = () => {
    return cartProducts.reduce((sum, item) => sum + item.price, 0)
  }

  return (
    <ThemeProvider>
      <AppContext.Provider
        value={{ favoriteCards, cartProducts, setCartProducts, order, setOrder }}>
        <div className='page'>
          <Drawer
            cartOpened={cartOpened}
            onClickCloseCart={() => setCartOpened(false)}
            amountProducts={handleCalculateTheAmount}
            onDeleteFromCart={(obj) => handleDeleteFromCart(obj)}
          />
          <Header
            onClickOpenCart={() => setCartOpened(true)}
            amountProducts={handleCalculateTheAmount}
          />
          <Routes>
            <Route
              exact
              path='/'
              element={
                <Home
                  products={products}
                  loading={isLoading}
                  onAddToCart={(obj) => handleAddToCart(obj)}
                  onDeleteFromCart={(obj) => handleDeleteFromCart(obj)}
                  onPushFavorite={(obj) => handleAddFavoriteCard(obj)}
                  onDeleteFavorite={(obj) => handleDeleteFavoriteCard(obj)}
                />
              }
            />
            <Route
              exact
              path='/favorite'
              element={
                <Favorite
                  onAddToCart={(obj) => handleAddToCart(obj)}
                  onDeleteFromCart={(obj) => handleDeleteFromCart(obj)}
                  onPushFavorite={(obj) => handleAddFavoriteCard(obj)}
                  onDeleteFavorite={(obj) => handleDeleteFavoriteCard(obj)}
                />
              }
            />
            <Route exact path='/order' element={<Order />} />
          </Routes>
          <Footer />
        </div>
      </AppContext.Provider>
    </ThemeProvider>
  )
}

export default App
