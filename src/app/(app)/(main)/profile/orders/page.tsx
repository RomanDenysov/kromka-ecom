import { DataTable } from '~/lib/ui/data-table'
import { api } from '~/trpc/server'
import NotAvailableAlert from '../_components/not-available-alert'
import { columns } from './columns'

export default async function OrdersPage() {
  const orders = await api.orders.getAll()

  if (!orders) {
    return <NotAvailableAlert />
  }

  return (
    <div className="text-center space-y-4">
      <DataTable columns={columns} data={orders} />
      <p className="text-base font-medium text-muted-foreground">
        Tu sa zobrazí vašich 10 posledných objednávok
      </p>
    </div>
  )
}
