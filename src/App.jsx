import React from 'react';
import search from './image/search.svg';
import Card from './components/Card/Card';
import Header from './components/Header';
import Drawer from './components/Drawer/Drawer';


function App() {
  const [products, setProducts] = React.useState([]);
  const [cartProducts, setCartProducts] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  // const [filter, setFilter] = React.useState([]);

  const handleAddToCart = (obj) => {
    if (cartProducts.find(item => item.name === obj.name)) return;
    setCartProducts(prev => [...prev, obj])
  }

  const handleDeleteFromCart = (obj) => {
    const updatedCart = cartProducts.filter(item => item.name !== obj.name);
    setCartProducts(updatedCart);
  }; 

  const handleCalculateTheAmount = () => {
    return cartProducts.reduce((sum, item) => sum + item.price, 0); 
  }

  console.log(cartProducts) //! контроль за корзиной товаров

  // const filterProducts = (searchValue) => {
  //   console.log(searchValue)
  //   const filteredProducts = products.filter(item => item.name.includes(searchValue));
  //   setFilter(filteredProducts);
  //   console.log('filter', filter)
  // }

  // const searchSubmit = (evt) => {
  //   evt.preventDefault();
  //   filterProducts();
  // }

  React.useEffect(() => {
    fetch('https://64ef20d5219b3e2873c3fd48.mockapi.io/sneakers')
    .then(res => {
      return res.json()
    })
    .then(json => {
      setProducts(json)
    }) 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='page'>
      <Drawer 
        cartOpened={cartOpened} 
        onClickCloseCart={() => setCartOpened(false)} 
        cartProducts={cartProducts} 
        amountProducts={handleCalculateTheAmount}
        onMinus={(obj) => handleDeleteFromCart(obj)}
      />
      <Header 
        onClickOpenCart={() => setCartOpened(true)} 
        amountProducts={handleCalculateTheAmount}
      />
      <main className='content'>
        <div className='navigation'>
          <h1 className='navigation__title'>Все кроссовки</h1>
          <form className='navigation__search'>
            <img className='navigation__search-img' src={search} alt='поиск'></img>
            <input 
              type='text'
              name='search'
              placeholder='Поиск...' 
              // value={}
              aria-label='Поиск кроссовок'></input>
          </form>
        </div>
        <section className='catalog'>
          {
            products.map(item => 
              <Card 
                key={item.id} 
                name={item.name} 
                imageUrl={item.imageUrl}
                price={item.price}
                onFavorite={() => console.log('favorite')}
                onPlus={(obj) => handleAddToCart(obj)}
                onMinus={(obj) => handleDeleteFromCart(obj)}
                cartProducts={cartProducts}
              />
            )
          }
        </section>
      </main>
      <footer className='footer'>
        <p className='footer__copyright'>&#169; 2023. React sneakers</p>
      </footer>
    </div>
  );
}

export default App;
