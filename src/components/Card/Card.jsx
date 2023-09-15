import React from 'react'
import './Card.scss'
import addProduct from '../../image/add-a-product.svg'
import cardLike from '../../image/card-like.png'
import cardLiked from '../../image/card-liked.svg'
import added from '../../image/added.svg'
import ContentLoaderCard from '../ContentLoaderCard/ContentLoaderCard'
import { AppContext } from '../../AppContext/AppContext'

function Card({
  id,
  name,
  price,
  imageUrl,
  onAddToCart,
  onDeleteFromCart,
  onPushFavorite,
  onDeleteFavorite,
  loading,
}) {
  const [isAddedProduct, setIsAddedProduct] = React.useState(false)
  const [isFavorite, setIsFavorite] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const { favoriteCards, cartProducts } = React.useContext(AppContext)

  const addProductToCart = async () => {
    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)

    try {
      if (!isAddedProduct) {
        onAddToCart({ id, name, price, imageUrl })
        setIsAddedProduct((state) => !state)
      } else {
        const cartProduct = cartProducts.find((item) => item.id === id)
        if (cartProduct) {
          const { mockApiId } = cartProduct
          onDeleteFromCart({ mockApiId })
          setIsAddedProduct((state) => !state)
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const addFavoriteCard = async () => {
    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)

    try {
      if (!isFavorite) {
        onPushFavorite({ id, name, price, imageUrl })
        setIsFavorite((state) => !state)
      } else {
        const favorites = favoriteCards.find((item) => item.id === id)
        if (favorites) {
          const { mockApiId } = favorites
          onDeleteFavorite({ mockApiId })
          setIsFavorite((state) => !state)
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  React.useEffect(() => {
    const isProductAdded = cartProducts?.some((item) => item.name === name)
    const isFavoriteAdded = favoriteCards?.some((item) => item.name === name)
    setIsFavorite(isFavoriteAdded)
    setIsAddedProduct(isProductAdded)
  }, [cartProducts, favoriteCards, name])

  return (
    <article className='card'>
      {loading ? (
        <ContentLoaderCard />
      ) : (
        <>
          <button className='card__button-like button' onClick={addFavoriteCard}>
            <img src={isFavorite ? cardLiked : cardLike} alt={isFavorite ? 'лайк' : 'дизлайк'} />
          </button>
          <img className='card__photo' src={imageUrl} alt={'Картинка ' + name.toLowerCase()} />
          <h2 className='card__title'>{name}</h2>
          <div className='card__align'>
            <div>
              <span className='card__price'>Цена:</span>
              <span className='card__price-product'>{price}руб.</span>
            </div>
            <button className='button' onClick={addProductToCart} disabled={isSubmitting}>
              <img
                src={isAddedProduct ? added : addProduct}
                alt={isAddedProduct ? 'добавлен товар' : 'добавить товар'}
              />
            </button>
          </div>
        </>
      )}
    </article>
  )
}

export default Card
