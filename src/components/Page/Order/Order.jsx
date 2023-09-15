import React from 'react'
import axios from 'axios'
import './Order.scss'
import Drawer from '../../Drawer/Drawer'
import Header from '../../Header/Header'
import CardInCart from '../../CardInCart/CardInCart'
import InfoMessage from '../../InfoMessage/InfoMessage'
import notOrder from '../../../image/not-order.svg'

function Order(props) {
  const [order, setOrder] = React.useState([])
  // const [isLoadingOrder, setIsLoadingOrder] = React.useState(false)

  React.useEffect(() => {
    try {
      ;(async () => {
        const ordersResponse = await axios.get('https://64f399bbedfa0459f6c6b22f.mockapi.io/order')
        setOrder(ordersResponse.data)
      })()
    } catch {
      alert('Не удалось загрузить историю заказов')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalOrder = () => {
    let totalArray = props.order.map((elem) =>
      elem.cartProducts.reduce((zero, item) => zero + item.price, 0),
    )
    return totalArray.reduce((zero, item) => zero + item, 0)
  }

  // const handleSendAnOrder = async (obj) => {
  //   try {
  //     setIsLoadingOrder(true)
  //     const { data } = await axios.post(`https://64f399bbedfa0459f6c6b22f.mockapi.io/order`, obj)
  //     setOrder((prev) => [...prev, data]) //! нужен ли мне стейт ордеров??? если мы берем информацию с бекенд???

  //     props.cartProducts.forEach((item) =>
  //       axios.delete(`https://64ef20d5219b3e2873c3fd48.mockapi.io/cart/${item.mockApiId}`),
  //     )
  //     setCartProducts([])
  //   } catch {
  //     alert('Не удалось отправить заказ =(')
  //   }
  //   setIsLoadingOrder(false)
  // }

  return (
    <>
      <Drawer
        cartOpened={props.cartOpened}
        onClickCloseCart={props.onClickCloseCart}
        cartProducts={props.cartProducts}
        amountProducts={props.amountProducts}
        onDeleteFromCart={props.onDeleteFromCart}
        onSendOrder={props.onSendOrder}
        orderId={order[order.length - 1]?.mockApiId}
      />
      <Header
        onClickOpenCart={props.onClickOpenCart}
        amountProducts={props.amountProducts}
        cardFavorite={props.cardFavorite}
      />
      <main className='order'>
        <h1>
          {order.length === 0 ? 'Мои покупки' : `Мои покупки на общую сумму: ${totalOrder()} руб.`}
        </h1>
        <section>
          {order.length === 0 ? (
            <InfoMessage
              image={notOrder}
              name={'У вас нет заказов'}
              text={'Оформите хотя бы один заказ'}
            />
          ) : (
            order.map((orderItem) => (
              <div key={orderItem.mockApiId} className='order__wrapper'>
                <span>
                  {`Заказ №${orderItem.mockApiId} на сумму 
                  ${orderItem.cartProducts.reduce((zero, item) => zero + item.price, 0)} руб.`}
                </span>
                <div className='order__products'>
                  {orderItem.cartProducts.map((item, index) => (
                    <CardInCart
                      key={`${item.id}${index}`}
                      id={item.id}
                      name={item.name}
                      imageUrl={item.imageUrl}
                      price={item.price}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </>
  )
}

export default Order
