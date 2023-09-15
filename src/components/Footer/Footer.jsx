import React from 'react'
import './Footer.scss'

function Footer() {
  const date = () => {
    let date = new Date()
    return date.getFullYear()
  }

  return (
    <footer className='footer'>
      <p className='footer__copyright'>&#169; {date()} React sneakers</p>
    </footer>
  )
}

export default Footer
