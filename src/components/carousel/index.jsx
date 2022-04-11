import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import { useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import 'react-alice-carousel/lib/alice-carousel.css'
import Slider from 'react-slick'

import './styles.css'

export const Carousel = () => {
  const queryClient = useQueryClient()
  const cryptoData = queryClient.getQueryData('cryptos')

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    cssEase: 'linear',
    pauseOnHover: true,
  }

  const items = cryptoData?.pages?.map((page) =>
    page?.slice(0, 10).map((crypto, index) => (
      <Link
        key={index}
        to={`cryptoDetails/${crypto?.id}`}
        className="carouselItem"
      >
        <img
          src={crypto?.image}
          alt="coin logo"
          className="carouselCoinImage"
        />
        <div>{crypto?.name}</div>
      </Link>
    ))
  )

  console.log('crypto', cryptoData)

  return (
    <div className="carouselContainer">
      <h1> Crypto Tracker</h1>
      <Slider
        {...settings}
        style={{
          width: '500px',
          height: '150px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {items}
      </Slider>
    </div>
  )
}
