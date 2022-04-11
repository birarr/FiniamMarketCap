import React, { useState, useMemo, useCallback } from 'react'
import { useInfiniteQuery } from 'react-query'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'
import ClipLoader from 'react-spinners/ClipLoader'
import { Crypto } from '../../components/crypto'
import { Banner } from '../../components/banner'
import { Header } from '../../components/header'

import './styles.css'

export const Home = () => {
  const [page, setPage] = useState(1)
  const [color, setColor] = useState('#DADADA')
  const [loading, setLoading] = useState(true)

  const fetchCryptos = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=EUR&order=market_cap_desc&per_page=20&page=${page}&sparkline=false&price_change_percentage=24h`
    )

    return response.json()
  }
  const {
    data: cryptosData,
    status: cryptosStatus,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery('cryptos', fetchCryptos, {
    getNextPageParam: () => (page < 6 ? true : undefined),
  })

  const handlePagination = useCallback(() => {
    console.log('deuuuuu')
    fetchNextPage()
    setPage((page) => page + 1)
  }, [])

  console.log({ cryptosData })
  console.log({ page })

  return (
    <>
      <div>
        <Header />
        {/* <Banner /> */}
        {cryptosStatus === 'loading' && (
          <div className="fetchLoading">
            <ClipLoader color={color} loading={loading} size={50} />
            Loading data...
          </div>
        )}
        {cryptosStatus === 'error' && (
          <div className="fetchError">Error fetching data</div>
        )}
        {cryptosStatus === 'success' && (
          <>
            <div className="listHeader">
              <div>Coin</div>
              <div>Price</div>
              <div>24h change</div>
              <div>Market cap</div>
            </div>
            <InfiniteScroll
              hasMore={hasNextPage}
              loadMore={handlePagination}
              loader={
                <div className="fetchLoading" key={page}>
                  <ClipLoader color={color} loading={loading} size={50} />
                  Loading data...
                </div>
              }
              style={{
                width: '90%',
                margin: 'auto',
                background: '#fff',
              }}
            >
              {cryptosData?.pages?.map((page) =>
                page?.map((crypto, index) => (
                  <Link
                    key={index}
                    to={`cryptoDetails/${crypto?.id}`}
                    className="listLink"
                  >
                    <Crypto key={crypto?.name} crypto={crypto} />
                  </Link>
                ))
              )}
            </InfiniteScroll>
          </>
        )}
      </div>
    </>
  )
}
