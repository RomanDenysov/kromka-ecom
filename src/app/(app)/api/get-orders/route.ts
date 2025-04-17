import { NextResponse } from 'next/server'
import { initPayload } from '~/server/payload/utils/payload'

export async function GET() {
  try {
    const payload = await initPayload()

    const orders = await payload.find({
      collection: 'orders',
      depth: 2, // Include related data
      where: {
        pickupDate: {
          greater_than: '2025-04-17',
          less_than: '2025-04-20',
        },
      },
    })

    return NextResponse.json(orders.docs)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}
