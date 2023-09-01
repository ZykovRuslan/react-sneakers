import React from 'react';
import './CardInCart.scss';
import deleteCard from '../../image/button-delete.svg';


function Card({name, price, imageUrl, onMinus}) {

  const deleteProductInCart = () => {
    onMinus({name, price, imageUrl})
  }

  return (
    <article className='cardInCart'>
      <img className='cardInCart__photo' src={imageUrl} alt={'Картинка ' + name.toLowerCase()} />
      <div className='cardInCart__align'>
        <h2 className='cardInCart__title'>{name}</h2>
        <span className='cardInCart__price-product'>{price}руб.</span>
      </div>
      <button className='button cart-item__button' onClick={deleteProductInCart}>
        <img src={deleteCard} alt='удалить товар'/>
      </button>
    </article>
  )
}

export default Card
