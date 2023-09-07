import React from 'react'
import './Home.scss'
import search from '../../../image/search.svg'
import deleteTextValue from '../../../image/button-delete.svg'
import Header from '../../Header/Header'
import Card from '../../Card/Card'
import Drawer from '../../Drawer/Drawer'

function Home(props) {
  const renderProducts = () => {
    const filtredProduct = props.products.filter((item) =>
      item.name.toLowerCase().includes(props.searchText.toLowerCase()),
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

  return (
    <>
      <Drawer
        cartOpened={props.cartOpened}
        onClickCloseCart={props.onClickCloseCart}
        cartProducts={props.cartProducts}
        amountProducts={props.amountProducts}
        onDeleteFromCart={props.onDeleteFromCart}
      />
      <Header onClickOpenCart={props.onClickOpenCart} amountProducts={props.amountProducts} />
      <main className='home'>
        <div className='home__wrapper'>
          <h1>{props.searchText ? `Поиск по: ${props.searchText}` : 'Все кроссовки'}</h1>
          <div className='home__align'>
            <img src={search} alt='поиск' />
            <input
              type='text'
              name='search'
              placeholder='Поиск...'
              value={props.searchText}
              onChange={props.onChange}
              aria-label='Поиск кроссовок'
            />
            {props.searchText && (
              <button className='button' onClick={props.handleDeleteSearchText}>
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
      <footer className='footer'>
        <p className='footer__copyright'>&#169; 2023. React sneakers</p>
      </footer>
    </>
  )
}

export default Home
