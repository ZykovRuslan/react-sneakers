import React from 'react'
import './Drawer.scss'
import { useMount } from '../../hooks/useMount'
import forth from '../../image/forth.svg'
import closeCart from '../../image/button-delete.svg'
import emptyCartImage from '../../image/empty-basket.svg'
import sendOrder from '../../image/sendOrder.svg'
import CardInCart from '../CardInCart/CardInCart'
import InfoMessage from '../InfoMessage/InfoMessage'
import { AppContext } from '../../AppContext/AppContext'
import axios from 'axios'

function Drawer({ cartOpened, onClickCloseCart, amountProducts, onDeleteFromCart }) {
  const [isOrderCompleted, setIsOrderCompleted] = React.useState(false)
  const [isLoadingOrder, setIsLoadingOrder] = React.useState(false)

  const { mounted } = useMount({ opened: cartOpened })
  const { cartProducts, setCartProducts, order, setOrder } = React.useContext(AppContext)

  const orderId = order[order.length - 1]?.mockApiId

  const closeModalEsq = (event) => {
    if (event.key === 'Escape') {
      onClickCloseCart()
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', closeModalEsq)
    return () => {
      document.removeEventListener('keydown', closeModalEsq)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!mounted) {
    return null
  }

  const calculateTheTax = () => {
    const totalTax = amountProducts() * 0.95
    return totalTax
  }

  const handleSendAnOrder = async () => {
    try {
      setIsLoadingOrder(true)
      const { data } = await axios.post(`https://64f399bbedfa0459f6c6b22f.mockapi.io/order`, {
        cartProducts,
      })
      setOrder((prev) => [...prev, data])

      cartProducts.forEach((item) =>
        axios.delete(`https://64ef20d5219b3e2873c3fd48.mockapi.io/cart/${item.mockApiId}`),
      )
      setCartProducts([])
      setIsOrderCompleted(true)
    } catch (error) {
      console.log(error)
      alert('Не удалось отправить заказ')
    }
    setIsLoadingOrder(false)
  }

  return (
    <div className='drawer'>
      <div
        className={cartOpened ? 'drawer__overlay_active' : 'drawer__overlay_inactive'}
        onClick={onClickCloseCart}
      />
      <div
        className={`drawer__cart ${cartOpened ? 'drawer__cart_active' : 'drawer__cart_inactive'}`}>
        <h1>
          Корзина
          <button className='button cart-item__button' onClick={onClickCloseCart}>
            <img src={closeCart} alt='закрыть корзину' />
          </button>
        </h1>
        <div className='drawer__items'>
          {cartProducts.length === 0 ? (
            <InfoMessage
              image={isOrderCompleted ? sendOrder : emptyCartImage}
              name={isOrderCompleted ? 'Заказ оформлен!' : 'Корзина пустая'}
              text={
                isOrderCompleted
                  ? `Ваш заказ №${orderId} скоро будет передан курьерской доставке`
                  : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
              }
              onClickCloseCart={onClickCloseCart}
              drawer
            />
          ) : (
            cartProducts.map((item) => (
              <CardInCart
                key={item.id}
                mockApiId={item.mockApiId}
                id={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                price={item.price}
                onDeleteFromCart={onDeleteFromCart}
                setIsOrderCompleted={setIsOrderCompleted}
                drawer
              />
            ))
          )}
        </div>
        {cartProducts.length ? (
          <>
            <ul>
              <li>
                Итого:<div></div>
                <span>{amountProducts()} руб.</span>
              </li>
              <li>
                Налог 5%:<div></div>
                <span>{calculateTheTax()} руб.</span>
              </li>
            </ul>
            <button
              className={'button drawer__button-forth'}
              onClick={handleSendAnOrder}
              disabled={isLoadingOrder}>
              Оформить заказ
              <img src={forth} alt='далее' />
            </button>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default Drawer
