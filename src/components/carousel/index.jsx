import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import { useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import 'react-alice-carousel/lib/alice-carousel.css'

import './styles.css'

export const Carousel = () => {
  const queryClient = useQueryClient()
  const cryptoData = queryClient.getQueryData('cryptos')

  //   const items = [
  //     <div className="item" data-value="1">
  //       1
  //     </div>,
  //     <div className="item" data-value="2">
  //       2
  //     </div>,
  //     <div className="item" data-value="3">
  //       3
  //     </div>,
  //     <div className="item" data-value="4">
  //       4
  //     </div>,
  //     <div className="item" data-value="5">
  //       5
  //     </div>,
  //   ]

  const items = cryptoData?.pages?.map((page) =>
    page?.slice(0, 10).map((crypto, index) => (
      <Link
        key={index}
        to={`characterdetails/${index + 1}`}
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

  console.log({ items })
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  }

  console.log('crypto', cryptoData)
  return (
    <div className="carousel">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlay={1000}
        animationDuration={1000}
        disableButtonsControls
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  )
}
