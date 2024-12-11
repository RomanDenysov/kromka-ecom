'use client'

import type {
  ColumnDef,
  ColumnFiltersState,
  Row,
  RowSelectionState,
  SortingState,
} from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/lib/ui/components/table'
import { Button } from './components/button'
import { Input } from './components/input'
import { LoaderButton } from './loader-button'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterKey?: string
  onDelete?: (rows: Row<TData>[]) => void
  disabled?: boolean
}

const ORDER_TABLE_PAGINATION_FEATURE_FLAG = false

export function DataTable<TData, TValue>({
  columns,
  data,
  filterKey,
  onDelete,
  disabled = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  return (
    <div>
      {filterKey && (
        <div className="flex items-center justify-between py-4">
          {/* TODO: make filter dynamic by implementing filterKey dropdown and passing
				it to DataTable */}

          <Input
            placeholder={`Filter ${filterKey}...`}
            className="max-w-sm"
            value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn(filterKey)?.setFilterValue(event.target.value)}
          />

          {onDelete && table.getFilteredSelectedRowModel().rows.length > 0 && (
            <LoaderButton
              isLoading={disabled}
              variant="destructive"
              onClick={() => table.resetColumnFilters()}
            >
              <TrashIcon size={24} />
              Delete ({table.getFilteredSelectedRowModel().rows.length})
            </LoaderButton>
          )}
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {ORDER_TABLE_PAGINATION_FEATURE_FLAG && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-muted-foreground text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <Button
            className="p-0"
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon size={32} />
          </Button>
          {/* TODO: Show page numbers */}
          <Button
            className="p-0"
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon size={32} />
          </Button>
        </div>
      )}
    </div>
  )
}
