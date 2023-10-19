import React from 'react'
import './styles.css'
const Button = ({text,onClick,disabled,width,color}) => {
  return (
    <div onClick={onClick} className='custom-btn' disabled={disabled} style={{width:width,border:`1px solid ${color}`,color:`${color}`}}>
        {text}
    </div>
  )
}
export default Button;