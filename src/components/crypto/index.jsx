import React from 'react'

import './styles.css'

export const Crypto = ({ crypto }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return (
    <div className="crypto">
      <div className="cryptoWrapper">
        <div className="cryptoInfo">
          <img src={crypto?.image} className="cryptonImage" alt="coin" />
          <div>
            <div>{crypto?.symbol.toUpperCase()}</div>
            <div className="cryptonName">{crypto.name}</div>
          </div>
        </div>
        <div>{formatter.format(crypto?.current_price)}</div>
        {crypto?.price_change_percentage_24h > 0 ? (
          <div className="positiveChange">
            +{crypto?.price_change_percentage_24h}
          </div>
        ) : (
          <div className="negativeChange">
            {crypto?.price_change_percentage_24h}
          </div>
        )}
        <div>{crypto?.market_cap}</div>
      </div>
      {/* <img src={rightArrow} alt="right arrow" className="rightArrow" /> */}
    </div>
  )
}
