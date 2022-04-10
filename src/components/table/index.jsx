import React, { useEffect, useMemo, useState } from 'react'
import { useTable } from 'react-table'
import { useQueryClient } from 'react-query'

import './styles.css'

export const Table = ({ columns, cryptosData }) => {
  const queryClient = useQueryClient()
  const cryptoData = queryClient.getQueryData('cryptos')
  console.log(cryptosData.pages[0], columns)

  const data = cryptosData?.pages?.map((crypto) => {
    return crypto
  })

  //   const columns = useMemo(() => [
  //     {
  //       Header: 'Coin',
  //       accessor: 'coin',
  //     },
  //     {
  //       Header: 'Price',
  //       accessor: 'price',
  //     },
  //     {
  //       Header: '24h Change',
  //       accessor: 'name',
  //     },
  //     {
  //       Header: 'Market Cap',
  //       accessor: 'name',
  //     },
  //   ])

  const tableInstance = useTable({
    columns,
    data: cryptosData.pages[0] ?? [],
  })
  console.log({ cryptosData })
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance
  return (
    // <Table {...getTableProps()}>
    //   <TableHead>
    //     {headerGroups.map((headerGroup) => (
    //       <TableRow {...headerGroup.getHeaderGroupProps()}>
    //         {headerGroup.headers.map((column) => (
    //           <TableHeader {...column.getHeaderProps()}>
    //             {column.render('Header')}
    //           </TableHeader>
    //         ))}
    //       </TableRow>
    //     ))}
    //   </TableHead>
    //   <TableBody {...getTableBodyProps()}>
    //     {rows.map((row) => {
    //       prepareRow(row)
    //       return (
    //         row.cells,
    //         map(cell, (index) => (
    //           <TableData {...cell.getCellProps()}>
    //             {cell.render('Cell')}
    //           </TableData>
    //         ))
    //       )
    //     })}
    //   </TableBody>
    // </Table>

    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps({
                  style: {
                    color: 'rgb(83, 241, 128)',
                  },
                })}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps({
                      style: {
                        textAlign: 'center',
                      },
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>

    // <div>hello</div>
  )
}
