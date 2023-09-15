import React from 'react'
import { AppContext } from '../../../AppContext/AppContext'
import './Favorive.scss'
import Card from '../../Card/Card'
import InfoMessage from '../../InfoMessage/InfoMessage'
import notFavorite from '../../../image/not-favorite.svg'

function Favorite(props) {
  const { favoriteCards } = React.useContext(AppContext)

  return (
    <main className='favorite'>
      <h1>Мои закладки</h1>
      <section>
        {favoriteCards.length === 0 ? (
          <InfoMessage
            image={notFavorite}
            name={'У вас нет закладок'}
            text={'Добавте что вам нравится'}
          />
        ) : (
          favoriteCards.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.name}
              imageUrl={item.imageUrl}
              price={item.price}
              onAddToCart={props.onAddToCart}
              onDeleteFromCart={props.onDeleteFromCart}
              onPushFavorite={props.onPushFavorite}
              onDeleteFavorite={props.onDeleteFavorite}
            />
          ))
        )}
      </section>
    </main>
  )
}

export default Favorite
