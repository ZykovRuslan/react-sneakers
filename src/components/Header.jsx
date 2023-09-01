import './Header/Header.scss';
import logo from '../image/logo.svg';
import basket from '../image/basket.svg';
import like from '../image/like.svg';
import profile from '../image/profile.svg';

function Header(props) {

  return (
    <header className='header'>
      <div className='header__wrapper-left'>
        <img className='header__logo' src={logo} alt='логотип' />
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
        <button className='button'>
          <img className='header__icon' src={like} alt='избранные товары' />
        </button>
        <button className='button'>
          <img className='header__icon' src={profile} alt='профиль' />
        </button>
      </div>
    </header>
  );
}

export default Header;
