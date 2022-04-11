import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams, useNavigate, Link } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import { IoMdArrowRoundBack } from 'react-icons/io'

import './styles.css'

export const CryptoDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [color, setColor] = useState('#DADADA')
  const [loading, setLoading] = useState(true)

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  })

  const fetchCrypto = async () => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
    const data = await response.json()
    return data
  }

  const { data: cryptoData, status: cryptoStatus } = useQuery(
    'crypto',
    fetchCrypto
  )
  console.log({ cryptoData })
  console.log({ cryptoStatus })
  const handleBackPage = () => {
    navigate('/')
  }

  return (
    <>
      <div className="courses-container">
        <IoMdArrowRoundBack className="backButton" onClick={handleBackPage} />
        {cryptoStatus === 'loading' && (
          <div className="fetchLoading">
            <ClipLoader color={color} loading={loading} size={50} />
            Loading data...
          </div>
        )}
        {cryptoStatus === 'error' && (
          <div className="fetchError">Error fetching data</div>
        )}
        <div className="course">
          <div className="course-preview">
            <img src={cryptoData?.image.small} alt="coin" />
            <h2>{cryptoData?.symbol.toUpperCase()}</h2>
            <div className="cryptoInfos">
              <div className="cryptoCategories">
                {cryptoData?.categories.map((category) => (
                  <div className="cryptoCategory">{category?.categories}</div>
                ))}
              </div>
              <div className="cryptoCurrentPrice">
                {formatter.format(cryptoData?.market_data?.current_price?.eur)}
              </div>
              <div className="cryptoTotalVolume">
                {formatter.format(cryptoData?.market_data?.total_volume?.eur)}
              </div>
              {cryptoData?.market_data?.price_change_percentage_24h > 0 ? (
                <div className="positiveChange">
                  +
                  {cryptoData?.market_data?.price_change_percentage_24h.toFixed(
                    2
                  )}
                </div>
              ) : (
                <div className="negativeChange">
                  {cryptoData?.market_data?.price_change_percentage_24h.toFixed(
                    2
                  )}
                </div>
              )}
            </div>
            <a href={cryptoData?.links?.homepage[0]} target="_blank">
              Visit official page <i className="fas fa-chevron-right"></i>
            </a>
          </div>
          <div className="course-info">
            <div className="progress-container">
              <div className="progress">
                <div
                  className="progressFill"
                  style={{
                    background: '#2a265f',
                    height: '5px',
                    width: cryptoData?.coingecko_score + '%',
                  }}
                ></div>
              </div>
              {cryptoData?.coingecko_score > 70 ? (
                <span className="progress-text">
                  CoinGecko score:{' '}
                  <span className="coinGeckoScoreGreen">
                    {cryptoData?.coingecko_score}
                  </span>
                </span>
              ) : (
                <span className="progress-text">
                  CoinGecko score:{' '}
                  <span className="coinGeckoScoreRed">
                    {cryptoData?.coingecko_score}
                  </span>
                </span>
              )}
            </div>
            <h6>Rank: {cryptoData?.market_cap_rank}</h6>
            <h2>{cryptoData?.name.toUpperCase()}</h2>
            <p className="cryptoDescription">{cryptoData?.description?.en}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => (window.location = 'mailto:birarr@gmail.com')}
        className="floating-btn"
      >
        Get in Touch
      </button>
      <div className="floating-text">
        <Link to="//next-portfolio-birarr.vercel.app/" target="_blank">
          #MyWebPortfolio
        </Link>
      </div>
    </>
  )
}
