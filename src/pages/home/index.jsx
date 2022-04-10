import React, { useState, useMemo, useCallback } from 'react'
import { useInfiniteQuery } from 'react-query'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'
import ClipLoader from 'react-spinners/ClipLoader'
import { Crypto } from '../../components/crypto'
import { Banner } from '../../components/banner'
import { Header } from '../../components/header'
import { Table } from '../../components/table'

import './styles.css'

export const Home = () => {
  const [page, setPage] = useState(1)
  const [color, setColor] = useState('#DADADA')
  const [loading, setLoading] = useState(true)

  const columns = useMemo(() => [
    {
      Header: 'Coin',
      accessor: 'name',
    },
    {
      Header: 'Price',
      accessor: 'current_price',
    },
    {
      Header: '24h Change',
      accessor: 'market_cap_change_24h',
    },
    // {
    //   Header: 'Market Cap',
    //   accessor: 'name',
    // },
  ])

  const fetchCryptos = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=20&page=${page}&sparkline=false&price_change_percentage=24h`
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

  console.log({ hasNextPage })
  console.log({ page })

  //   const data = cryptosData?.pages?.map((crypto) => {
  //     return crypto
  //   })

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
                    to={`characterdetails/${index + 1}`}
                    className="listLink"
                  >
                    <Crypto key={crypto?.name} crypto={crypto} />
                  </Link>
                ))
              )}
            </InfiniteScroll>
          </>
        )}
        {/* {!isLoading ? (
          <Table columns={columns} cryptosData={cryptosData} />
        ) : (
          <div>hello</div>
        )} */}
      </div>
    </>
  )
}
