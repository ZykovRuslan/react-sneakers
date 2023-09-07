import React from 'react';
import './Drawer.scss';
import { useMount } from '../../hooks/useMount';
import forth from '../../image/forth.svg';
import closeCart from '../../image/button-delete.svg';
import emptyCartImage from '../../image/empty-basket.svg';
import CardInCart from '../CardInCart/CardInCart';

function Drawer(props) {

  const { mounted } = useMount({ opened: props.cartOpened });

  const closeModalEsq = (event) => {
    if (event.key === "Escape") {
      props.onClickCloseCart();
    }
  }

  React.useEffect(()=> {
    document.addEventListener("keydown", closeModalEsq);
    return () => { document.removeEventListener("keydown", closeModalEsq) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if(!mounted) {
    return null;
  }

  const calculateTheTax = () => {
    const totalTax = (props.amountProducts() * 5) / 100
    return totalTax;
  }

  return (
    <div className='drawer'>
      <div className={props.cartOpened ? 'drawer__overlay_active' : 'drawer__overlay_inactive'} onClick={props.onClickCloseCart} />
      <div className={`drawer__cart ${props.cartOpened ? 'drawer__cart_active' : 'drawer__cart_inactive'}`}>
        <h2>
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
                  mockApiId={item.mockApiId}
                  id={item.id}
                  name={item.name} 
                  imageUrl={item.imageUrl}
                  price={item.price}
                  onDeleteFromCart={props.onDeleteFromCart}
                />)
              )
          }
        </div>
        {props.cartProducts.length !== 0 ? (
          <>
            <ul>
              <li>
                Итого:<div></div>
                <span>{props.amountProducts()} руб.</span>
              </li>
              <li>
                Налог 5%:<div></div>
                <span>{calculateTheTax()} руб.</span>
              </li>
            </ul>
            <button className='button drawer__button-forth'>
              Оформить заказ
              <img src={forth} alt='далее' />
            </button>
          </>
          ) : (
            <button className='button drawer__button-back' onClick={props.onClickCloseCart}>
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
