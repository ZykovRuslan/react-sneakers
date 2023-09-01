import React from 'react';
import './Card.scss';
import addProduct from '../../image/add-a-product.svg';
import cardLike from '../../image/card-like.png';
import added from '../../image/added.svg';

function Card({name, price, imageUrl, onPlus, onMinus, cartProducts}) {

  const [isAddedProduct, setIsAddedProduct] = React.useState(false);

  const addProductToCart = () => {
    if (!isAddedProduct) {
      onPlus({name, price, imageUrl})
      setIsAddedProduct(state => !state)
    } else {
      onMinus({name, price, imageUrl})
      setIsAddedProduct(state => !state)
    }
  }

  React.useEffect(() => {
    const isProductAdded = cartProducts?.some(item => item.name === name);
    setIsAddedProduct(isProductAdded);
  }, [cartProducts, name]);

  return (
    <article className='card'>
      <button className='card__button-like button'>
        <img src={cardLike} alt='нравится товар' />
      </button>
      <img className='card__photo' src={imageUrl} alt={'Картинка ' + name.toLowerCase()} />
      <h2 className='card__title'>{name}</h2>
      <div className='card__align'>
        <div>
          <span className='card__price'>Цена:</span>
          <span className='card__price-product'>{price}руб.</span>
        </div>
        <button className='button' onClick={addProductToCart}>
          <img src={isAddedProduct ? added : addProduct} alt='добавить товар' />
        </button>
      </div>
    </article>
  )
}

export default Card
