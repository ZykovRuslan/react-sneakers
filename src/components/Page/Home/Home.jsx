import React from 'react'
import './Home.scss'
import search from '../../../image/search.svg'
import deleteTextValue from '../../../image/button-delete.svg'
import Card from '../../Card/Card'
import SimpleSlider from '../../Slider/Slider'

function Home(props) {
  const [searchText, setSearchText] = React.useState('')

  const renderProducts = () => {
    const filtredProduct = props.products.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    )
    return (
      props.loading
        ? [...Array(8)].map((_, index) => <Card key={index} loading={props.loading} />)
        : filtredProduct
    ).map((item, index) => (
      <Card
        key={index}
        id={item.id}
        name={item.name}
        imageUrl={item.imageUrl}
        price={item.price}
        onAddToCart={props.onAddToCart}
        onDeleteFromCart={props.onDeleteFromCart}
        onPushFavorite={props.onPushFavorite}
        onDeleteFavorite={props.onDeleteFavorite}
        loading={props.loading}
      />
    ))
  }

  const handleChangeSearchInput = (event) => {
    setSearchText(event.target.value)
  }

  const handleDeleteSearchText = (event) => {
    event.preventDefault()
    setSearchText('')
  }

  return (
    <main className='home'>
      <SimpleSlider />
      <div className='home__wrapper'>
        <h1>{searchText ? `Поиск по: ${searchText}` : 'Все кроссовки'}</h1>
        <div className='home__align'>
          <img src={search} alt='поиск' />
          <input
            type='text'
            name='search'
            placeholder='Поиск...'
            value={searchText}
            onChange={handleChangeSearchInput}
            aria-label='Поиск кроссовок'
          />
          {searchText && (
            <button className='button' onClick={handleDeleteSearchText}>
              <img className='button__delete-img' src={deleteTextValue} alt='удалить текст' />
            </button>
          )}
        </div>
      </div>
      <section>{renderProducts()}</section>
    </main>
  )
}

export default Home
