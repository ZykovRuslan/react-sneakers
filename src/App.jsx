import React from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Home from './components/Page/Home/Home'
import Favorite from './components/Page/Favorite/Favorite'
import Order from './components/Page/Order/Order'
import Footer from './components/Footer/Footer'

export const AppContext = React.createContext({})

function App() {
  const [products, setProducts] = React.useState([])
  const [cartProducts, setCartProducts] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false)
  const [favoriteCards, setFavoriteCards] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [order, setOrder] = React.useState([])
  const [isLoadingOrder, setIsLoadingOrder] = React.useState(false)

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
    } catch {
      alert('Ошибка при загрузке данных')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddToCart = async (obj) => {
    try {
      const { data } = await axios.post('https://64ef20d5219b3e2873c3fd48.mockapi.io/cart', obj)
      setCartProducts((prev) => [...prev, data])
    } catch {
      alert('Не удалось добавить в корзину')
    }
  }

  const handleDeleteFromCart = (obj) => {
    try {
      axios.delete(`https://64ef20d5219b3e2873c3fd48.mockapi.io/cart/${obj.mockApiId}`)
      const updatedCart = cartProducts.filter((item) => item.mockApiId !== obj.mockApiId)
      setCartProducts(updatedCart)
    } catch {
      alert('Не удалось удалить из корзины')
    }
  }

  const handleAddFavoriteCard = async (obj) => {
    try {
      const { data } = await axios.post('https://64f399bbedfa0459f6c6b22f.mockapi.io/favorite', obj)
      setFavoriteCards((prev) => [...prev, data])
    } catch {
      alert('Не удалось добавить в закладки')
    }
  }

  const handleDeleteFavoriteCard = (obj) => {
    axios.delete(`https://64f399bbedfa0459f6c6b22f.mockapi.io/favorite/${obj.mockApiId}`)
    const updatedFavorite = favoriteCards.filter((item) => item.mockApiId !== obj.mockApiId)
    setFavoriteCards(updatedFavorite)
  }

  const handleSendAnOrder = async (obj) => {
    try {
      setIsLoadingOrder(true)
      const { data } = await axios.post(`https://64f399bbedfa0459f6c6b22f.mockapi.io/order`, obj)
      setOrder((prev) => [...prev, data]) //! нужен ли мне стейт ордеров??? если мы берем информацию с бекенд???

      cartProducts.forEach((item) =>
        axios.delete(`https://64ef20d5219b3e2873c3fd48.mockapi.io/cart/${item.mockApiId}`),
      )
      setCartProducts([])
    } catch {
      alert('Не удалось отправить заказ =(')
    }
    setIsLoadingOrder(false)
  }

  const handleCalculateTheAmount = () => {
    return cartProducts.reduce((sum, item) => sum + item.price, 0)
  }

  return (
    <AppContext.Provider value={{ products, cartProducts, favoriteCards }}>
      <div className='page'>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <Home
                cartOpened={cartOpened}
                cartProducts={cartProducts}
                onClickCloseCart={() => setCartOpened(false)}
                amountProducts={handleCalculateTheAmount}
                onDeleteFromCart={(obj) => handleDeleteFromCart(obj)}
                onClickOpenCart={() => setCartOpened(true)}
                products={products}
                onAddToCart={(obj) => handleAddToCart(obj)}
                onPushFavorite={(obj) => handleAddFavoriteCard(obj)}
                onDeleteFavorite={(obj) => handleDeleteFavoriteCard(obj)}
                onSendOrder={(obj) => handleSendAnOrder(obj)}
                cardFavorite={favoriteCards}
                loading={isLoading}
                orderId={order[order.length - 1]?.mockApiId}
                isLoadingOrder={isLoadingOrder}
              />
            }
          />
          <Route
            exact
            path='/favorite'
            element={
              <Favorite
                cartOpened={cartOpened}
                cartProducts={cartProducts}
                onClickCloseCart={() => setCartOpened(false)}
                amountProducts={handleCalculateTheAmount}
                onClickOpenCart={() => setCartOpened(true)}
                products={products}
                onAddToCart={(obj) => handleAddToCart(obj)}
                onDeleteFromCart={(obj) => handleDeleteFromCart(obj)}
                onPushFavorite={(obj) => handleAddFavoriteCard(obj)}
                onDeleteFavorite={(obj) => handleDeleteFavoriteCard(obj)}
                onSendOrder={(obj) => handleSendAnOrder(obj)}
                cardFavorite={favoriteCards}
                orderId={order[order.length - 1]?.mockApiId}
              />
            }
          />
          <Route
            exact
            path='/order'
            element={
              <Order
                amountProducts={handleCalculateTheAmount}
                onClickOpenCart={() => setCartOpened(true)}
                cartOpened={cartOpened}
                cartProducts={cartProducts}
                onClickCloseCart={() => setCartOpened(false)}
                onDeleteFromCart={(obj) => handleDeleteFromCart(obj)}
                onSendOrder={(obj) => handleSendAnOrder(obj)}
                order={order}
                orderId={order[order.length - 1]?.mockApiId}
                cardFavorite={favoriteCards}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </AppContext.Provider>
  )
}

export default App
