import React from 'react'
import { Link } from 'react-router-dom'
import './InfoMessage.scss'
import forth from '../../image/forth.svg'

const InfoMessage = ({ name, text, image, drawer, onClickCloseCart }) => {
  return (
    <div className='infoMessage'>
      <img className='infoMessage__img' src={image} alt='картинка' />
      <h2>{name}</h2>
      <p>{text}</p>
      {drawer ? (
        <button className='button infoMessage__button-back' onClick={onClickCloseCart}>
          Вернуться назад
          <img className='infoMessage__back-img' src={forth} alt='назад' />
        </button>
      ) : (
        <Link className='infoMessage__link' to={-1}>
          <button className='button infoMessage__button-back'>
            Вернуться назад
            <img className='infoMessage__back-img' src={forth} alt='назад' />
          </button>
        </Link>
      )}
    </div>
  )
}

export default InfoMessage
