import React from 'react';
import './CardInCart.scss';
import deleteCard from '../../image/button-delete.svg';


function Card({id, name, price, imageUrl, onDeleteFromCart, mockApiId}) {

  const deleteProductInCart = () => {
    onDeleteFromCart({mockApiId})
  }

  return (
    <article className='cardInCart'>
      <img src={imageUrl} alt={'Картинка ' + name.toLowerCase()} />
      <div className='cardInCart__align'>
        <h2>{name}</h2>
        <span>{price}руб.</span>
      </div>
      <button className='button' onClick={deleteProductInCart}>
        <img className='cardInCart__img' src={deleteCard} alt='удалить товар'/>
      </button>
    </article>
  )
}

export default Card
