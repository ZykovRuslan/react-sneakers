import React from 'react'
import './Favorive.scss'
import Header from '../../Header/Header'
import Card from '../../Card/Card'
import Drawer from '../../Drawer/Drawer'
import InfoMessage from '../../InfoMessage/InfoMessage'
import notFavorite from '../../../image/not-favorite.svg'

function Favorite(props) {
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
      <main className='favorite'>
        <h1>Мои закладки</h1>
        <section>
          {props.cardFavorite.length === 0 ? (
            <InfoMessage
              image={notFavorite}
              name={'У вас нет закладок'}
              text={'Добавте что вам нравится'}
            />
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
                onPushFavorite={props.onPushFavorite}
                onDeleteFavorite={props.onDeleteFavorite}
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
