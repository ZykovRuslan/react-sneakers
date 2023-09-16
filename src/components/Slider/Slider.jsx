import React from 'react'
import Slider from 'react-slick'
import './Slider.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import sliderNike from '../../image/nike-poster.jpeg'
import sliderAdidas from '../../image/adidas-poster.jpeg'
import sliderPuma from '../../image/puma-poster.webp'

function SimpleSlider() {
  const settings = {
    arrows: true, // Показывать стрелки
    infinite: true, // Бесконечная прокрутка
    speed: 500, // Скорость анимации
    slidesToShow: 1, // Количество отображаемых слайдов
    slidesToScroll: 1, // Количество прокручиваемых слайдов
  }

  return (
    <Slider {...settings} className='slider'>
      <div>
        <img src={sliderNike} alt='Слайдер Найк' />
      </div>
      <div>
        <img src={sliderAdidas} alt='Слайдер Адидас' />
      </div>
      <div>
        <img src={sliderPuma} alt='Слайдер Пума' />
      </div>
    </Slider>
  )
}

export default SimpleSlider
