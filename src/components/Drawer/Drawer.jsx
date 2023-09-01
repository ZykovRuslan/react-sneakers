import React from 'react';
import './Drawer.scss';
import forth from '../../image/forth.svg';
import closeCart from '../../image/button-delete.svg';
import emptyCartImage from '../../image/empty-basket.svg';
import CardInCart from '../CardInCart/CardInCart';

function Drawer(props) {

  const calculateTheTax = () => {
    const totalTax = (props.amountProducts() * 5) / 100
    return totalTax;
  }
  console.log('drawer') //! обновление корзины
  return (
    <div className={props.cartOpened ? 'overlay' : 'overlay_inactiv'}>
      <div className={`drawer ${props.cartOpened ? 'drawer_active' : 'drawer_inactive'}`}>
        <h2 className='drawer__title'>
          Корзина
          <button className='button cart-item__button' onClick={props.onClickCloseCart}>
            <img src={closeCart} alt='закрыть корзину' />
          </button>
        </h2>
        <div className='drawer__items'>
          {
            props.cartProducts.length === 0 ? 
              (
                <div className='drawer__empty-cart'>
                  <img src={emptyCartImage} alt='Пустая корзина' />
                  <h3>Корзина пустая</h3>
                  <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                </div>
              ) : (
                props.cartProducts.map(item => 
                <CardInCart 
                  key={item.id} 
                  name={item.name} 
                  imageUrl={item.imageUrl}
                  price={item.price}
                  onMinus={props.onMinus}
                />)
              )
          }
        </div>
        {props.cartProducts.length !== 0 ? (
          <>
            <ul className='drawer__align'>
              <li className='drawer__text'>
                Итого:<div className='drawer__dashed'></div>
                <span className='drawer__sum'>{props.amountProducts()} руб.</span>
              </li>
              <li className='drawer__text'>
                Налог 5%:<div className='drawer__dashed'></div>
                <span className='drawer__sum'>{calculateTheTax()} руб.</span>
              </li>
            </ul>
            <button className='button drawer__button-forth'>
              Оформить заказ
              <img src={forth} alt='далее' />
            </button>
          </>
          ) : (
            <button className='button drawer__button-back'>
              Вернуться назад
              <img src={forth} alt='назад' />
            </button>
          )
        }
        
      </div>
    </div>
  )
}

export default Drawer
