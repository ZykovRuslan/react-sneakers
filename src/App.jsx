import React from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Home from './components/Page/Home/Home'
import Favorite from './components/Page/Favorite/Favorite'
import Order from './components/Page/Order/Order'
import Header from './components/Header/Header'
import Drawer from './components/Drawer/Drawer'
import Footer from './components/Footer/Footer'
import { AppContext } from './AppContext/AppContext'

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
        const cartResponse = await axios.get('https://64ef20d5219b3e2873c3fd48.mockapi.io/cart')
        const favoritesResponse = await axios.get(
          'https://64f399bbedfa0459f6c6b22f.mockapi.io/favorite',
        )
        const productsResponse = await axios.get(
          'https://64ef20d5219b3e2873c3fd48.mockapi.io/sneakers',
        )
        setIsLoading(false)
        setCartProducts(cartResponse.data)
        setFavoriteCards(favoritesResponse.data)
        setProducts(productsResponse.data)
      })()
    } catch (error) {
      console.log(error)
      alert('Ошибка при загрузке данных')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddToCart = async (obj) => {
    try {
      const { data } = await axios.post('https://64ef20d5219b3e2873c3fd48.mockapi.io/cart', obj)
      setCartProducts((prev) => [...prev, data])
    } catch (error) {
      console.log(error)
      alert('Не удалось добавить в корзину')
    }
  }

  const handleDeleteFromCart = (obj) => {
    try {
      axios.delete(`https://64ef20d5219b3e2873c3fd48.mockapi.io/cart/${obj.mockApiId}`)
      const updatedCart = cartProducts.filter((item) => item.mockApiId !== obj.mockApiId)
      setCartProducts(updatedCart)
    } catch (error) {
      console.log(error)
      alert('Не удалось удалить из корзины')
    }
  }

  const handleAddFavoriteCard = async (obj) => {
    try {
      const { data } = await axios.post('https://64f399bbedfa0459f6c6b22f.mockapi.io/favorite', obj)
      setFavoriteCards((prev) => [...prev, data])
    } catch (error) {
      console.log(error)
      alert('Не удалось добавить в закладки')
    }
  }

  const handleDeleteFavoriteCard = (obj) => {
    axios.delete(`https://64f399bbedfa0459f6c6b22f.mockapi.io/favorite/${obj.mockApiId}`)
    const updatedFavorite = favoriteCards.filter((item) => item.mockApiId !== obj.mockApiId)
    setFavoriteCards(updatedFavorite)
  }

  const handleCalculateTheAmount = () => {
    return cartProducts.reduce((sum, item) => sum + item.price, 0)
  }

  return (
    <AppContext.Provider value={{ favoriteCards, cartProducts, setCartProducts, order, setOrder }}>
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
  )
}

export default App
