import React from 'react'

import './styles.css'

export const Crypto = ({ crypto }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  })

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

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
            +{crypto?.price_change_percentage_24h.toFixed(2) + '%'}
          </div>
        ) : (
          <div className="negativeChange">
            {crypto?.price_change_percentage_24h.toFixed(2) + '%'}
          </div>
        )}
        <div className="coinMarketCap">
          ₹{numberWithCommas(crypto?.market_cap)}
        </div>
      </div>
      {/* <img src={rightArrow} alt="right arrow" className="rightArrow" /> */}
    </div>
  )
}
