import React from 'react'
import './ThemeToggle.scss'

function ThemeToggle(props) {
  return <input type='checkbox' className='checkbox switch' onChange={props.onChange} />
}

export default ThemeToggle
