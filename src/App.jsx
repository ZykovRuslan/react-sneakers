import React from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Home from './components/Page/Home/Home'
import Favorite from './components/Page/Favorite/Favorite'

export const AppContext = React.createContext({})

function App() {
  const [products, setProducts] = React.useState([])
  const [cartProducts, setCartProducts] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false)
  const [searchText, setSearchText] = React.useState('')
  const [favoriteCards, setFavoriteCards] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    //! сделать  try catch promise.all
    async function fetchData() {
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
    }

    fetchData()
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

  const handleCalculateTheAmount = () => {
    return cartProducts.reduce((sum, item) => sum + item.price, 0)
  }

  const handleChangeSearchInput = (event) => {
    setSearchText(event.target.value)
  }

  const handleDeleteSearchText = (event) => {
    event.preventDefault()
    setSearchText('')
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
                searchText={searchText}
                onChange={handleChangeSearchInput}
                handleDeleteSearchText={handleDeleteSearchText}
                products={products}
                onAddToCart={(obj) => handleAddToCart(obj)}
                onPushFavorite={(obj) => handleAddFavoriteCard(obj)}
                onDeleteFavorite={(obj) => handleDeleteFavoriteCard(obj)}
                cardFavorite={favoriteCards}
                loading={isLoading}
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
                onDeleteFromCart={(obj) => handleDeleteFromCart(obj)}
                onClickOpenCart={() => setCartOpened(true)}
                searchText={searchText}
                onChange={handleChangeSearchInput}
                handleDeleteSearchText={handleDeleteSearchText}
                products={products}
                onAddToCart={(obj) => handleAddToCart(obj)}
                onPushFavorite={(obj) => handleAddFavoriteCard(obj)}
                onDeleteFavorite={(obj) => handleDeleteFavoriteCard(obj)}
                cardFavorite={favoriteCards}
              />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App
