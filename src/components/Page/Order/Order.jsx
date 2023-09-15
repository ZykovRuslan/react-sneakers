import React from 'react'
import axios from 'axios'
import './Order.scss'
import CardInCart from '../../CardInCart/CardInCart'
import InfoMessage from '../../InfoMessage/InfoMessage'
import notOrder from '../../../image/not-order.svg'
import { AppContext } from '../../../AppContext/AppContext'

function Order(props) {
  const { order, setOrder } = React.useContext(AppContext)

  React.useEffect(() => {
    try {
      ;(async () => {
        const ordersResponse = await axios.get('https://64f399bbedfa0459f6c6b22f.mockapi.io/order')
        setOrder(ordersResponse.data)
      })()
    } catch (error) {
      console.log(error)
      alert('Не удалось загрузить историю заказов')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalOrder = () => {
    let totalArray = order.map((elem) =>
      elem.cartProducts.reduce((zero, item) => zero + item.price, 0),
    )
    return totalArray.reduce((zero, item) => zero + item, 0)
  }

  return (
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
  )
}

export default Order
