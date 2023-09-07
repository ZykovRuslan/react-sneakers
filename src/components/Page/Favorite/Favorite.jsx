import React from 'react'
import './Favorive.scss'
import Header from '../../Header/Header'
import Card from '../../Card/Card'
import Drawer from '../../Drawer/Drawer'

function Favorite(props) {
  const handlePushFavorite = (obj) => {
    props.onPushFavorite(obj)
  }

  const handleDeleteFavorite = (obj) => {
    props.onDeleteFavorite(obj)
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
      <main className='favorite'>
        <h1>Мои закладки</h1>
        <section>
          {props.cardFavorite.length === 0 ? (
            <p>В закладки пока ничего не добавлено</p>
          ) : (
            props.cardFavorite.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                price={item.price}
                onAddToCart={props.onAddToCart}
                onDeleteFromCart={props.onDeleteFromCart}
                cartProducts={props.cartProducts}
                onPushFavorite={(obj) => handlePushFavorite(obj)}
                onDeleteFavorite={(obj) => handleDeleteFavorite(obj)}
                cardFavorite={props.cardFavorite}
              />
            ))
          )}
        </section>
      </main>
    </>
  )
}

export default Favorite
