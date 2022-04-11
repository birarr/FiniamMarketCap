import React from 'react'

import './styles.css'

export const Header = ({ setCurrency }) => {
  return (
    <div className="headerContainer">
      <h1>Finiam Market Cap</h1>
      <select
        type="text"
        name="currency"
        id=""
        onChange={(e) => setCurrency(e.target.value)}
      >
        <option value="EUR">Euro</option>
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="GBP">GBP</option>
        <option value="BRL">BRL</option>
        <option value="CNY">CNY</option>
      </select>
    </div>
  )
}
