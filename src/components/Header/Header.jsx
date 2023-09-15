import './Header.scss'
import { Link } from 'react-router-dom'
import logo from '../../image/logo.png'
import basket from '../../image/basket.svg'
import like from '../../image/like.svg'
import profile from '../../image/profile.svg'

function Header(props) {
  return (
    <header className='header'>
      <div className='header__wrapper-left'>
        <Link to='/'>
          <img className='header__logo' src={logo} alt='логотип' />
        </Link>
        <div className='header__align'>
          <h2 className='header__title'>React sneakers</h2>
          <p className='header__subtitle'>Магазин лучших кроссовок</p>
        </div>
      </div>
      <div className='header__wrapper-right'>
        <button className='button' onClick={props.onClickOpenCart}>
          <img className='header__icon' src={basket} alt='корзина' />
          <span className='header__text'>{props.amountProducts()} руб.</span>
        </button>
        <button className='button header__button-like'>
          <Link to='/favorite'>
            <img className='header__icon' src={like} alt='закладки' />
            {props.cardFavorite.length !== 0 ? <span>{props.cardFavorite.length}</span> : null}
          </Link>
        </button>

        <button className='button'>
          <Link to='/order'>
            <img className='header__icon' src={profile} alt='история заказов' />
          </Link>
        </button>
      </div>
    </header>
  )
}

export default Header
