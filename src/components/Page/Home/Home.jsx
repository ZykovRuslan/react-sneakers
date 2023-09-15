import React from 'react'
import './Home.scss'
import search from '../../../image/search.svg'
import deleteTextValue from '../../../image/button-delete.svg'
import Header from '../../Header/Header'
import Card from '../../Card/Card'
import Drawer from '../../Drawer/Drawer'

function Home(props) {
  const [searchText, setSearchText] = React.useState('')

  const renderProducts = () => {
    const filtredProduct = props.products.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    )

    return (
      props.loading
        ? [...Array(8)].map((_, index) => <Card key={index} loading={props.loading} />)
        : filtredProduct
    ).map((item, index) => (
      <Card
        key={index}
        id={item.id}
        name={item.name}
        imageUrl={item.imageUrl}
        price={item.price}
        onAddToCart={props.onAddToCart}
        onDeleteFromCart={props.onDeleteFromCart}
        cartProducts={props.cartProducts}
        onPushFavorite={props.onPushFavorite}
        onDeleteFavorite={props.onDeleteFavorite}
        cardFavorite={props.cardFavorite}
        loading={props.loading}
      />
    ))
  }

  const handleChangeSearchInput = (event) => {
    setSearchText(event.target.value)
  }

  const handleDeleteSearchText = (event) => {
    event.preventDefault()
    setSearchText('')
  }

  return (
    <>
      <Drawer
        cartOpened={props.cartOpened}
        onClickCloseCart={props.onClickCloseCart}
        cartProducts={props.cartProducts}
        amountProducts={props.amountProducts}
        onDeleteFromCart={props.onDeleteFromCart}
        onSendOrder={props.onSendOrder}
        orderId={props.orderId}
      />
      <Header
        onClickOpenCart={props.onClickOpenCart}
        amountProducts={props.amountProducts}
        cardFavorite={props.cardFavorite}
      />
      <main className='home'>
        <div className='home__wrapper'>
          <h1>{searchText ? `Поиск по: ${searchText}` : 'Все кроссовки'}</h1>
          <div className='home__align'>
            <img src={search} alt='поиск' />
            <input
              type='text'
              name='search'
              placeholder='Поиск...'
              value={searchText}
              onChange={handleChangeSearchInput}
              aria-label='Поиск кроссовок'
            />
            {searchText && (
              <button className='button' onClick={handleDeleteSearchText}>
                <img className='button__delete-img' src={deleteTextValue} alt='удалить текст' />
              </button>
            )}
          </div>
        </div>
        <section>
          {/* {props.loading &&
          props.products.filter((item) =>
            item.name.toLowerCase().includes(props.searchText.toLowerCase()),
          ).length === 0 ? (
            <p>По поиcку ничего не найдено</p>
          ) : (
            renderProducts()
          )} */}
          {renderProducts()}
        </section>
      </main>
    </>
  )
}

export default Home
