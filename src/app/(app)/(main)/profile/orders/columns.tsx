'use client'

import type { Order, Store } from '@payload-types'
import type { ColumnDef } from '@tanstack/react-table'
import { formatDate } from 'date-fns'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '~/lib/ui/components/button'
import { formatPrice } from '~/lib/utils'

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: 'Číslo Obj.',
    cell: ({ row }) => {
      const id = row.getValue('id') as string

      return `#${id.split('-')[0]}`
    },
  },
  {
    // TODO: add sorting and select for status
    accessorKey: 'status',
    header: 'Status',
    cell: ({ cell }) => {
      const status = cell.getValue() as string

      let orderStatus = undefined

      switch (status) {
        case 'new':
          orderStatus = (
            <span className="bg-gray-400 rounded-lg p-1 text-xs font-medium">Nová objednávka</span>
          )
          break
        case 'processing':
          orderStatus = (
            <span className="bg-yellow-300 rounded-lg p-1 text-xs font-medium">Spracováva sa</span>
          )
          break
        case 'ready':
          orderStatus = (
            <span className="bg-green-300 rounded-lg p-1 text-xs font-medium">
              Pripravená na odber
            </span>
          )
          break
        case 'complete':
          orderStatus = (
            <span className="bg-blue-300 rounded-lg p-1 text-xs font-medium">Dokončená</span>
          )
          break
        case 'cancelled':
          orderStatus = (
            <span className="bg-red-300 rounded-lg p-1 text-xs font-medium">Zrušená</span>
          )
          break
        default:
          orderStatus = (
            <span className="bg-gray-400 rounded-lg p-1 text-xs font-medium">Nová objednávka</span>
          )
          break
      }
      return orderStatus
    },
  },
  {
    // TODO: add sorting and select for category
    accessorKey: 'pickupStore',
    header: 'Obchod',
    cell: ({ cell }) => {
      const store = cell.row.original.pickupStore as Store

      return store.title
    },
  },
  {
    // TODO: add sorting and select for status
    accessorKey: 'pickupDate',
    header: 'Dátum vyzdvihnutia',
    cell: ({ row }) => formatDate(row.getValue('pickupDate'), 'dd.MM.yyyy'),
  },
  {
    accessorKey: 'method',
    header: 'Spôsob platby',
    cell: ({ row }) => {
      const method = row.getValue('method')

      return method === 'store' ? 'V obchode' : 'Kartou'
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Vytvorená',
    cell: ({ row }) => formatDate(row.getValue('createdAt'), 'dd.MM.yyyy'),
  },
  {
    accessorKey: 'total',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Spolu
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <b>{formatPrice(row.getValue('total'))}</b>
    },
  },
]
