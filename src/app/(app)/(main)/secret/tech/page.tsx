'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';

interface Order {
    id: string;
    user: {
        email: string;
    };
    pickupStore: {
        name: string;
    };
    items: Array<{
        product: {
            name: string;
        };
        quantity: number;
        price: number;
    }>;
    pickupDate: string;
    status: string;
    total: number;
    note?: string;
    createdAt: string;
    updatedAt: string;
}

export default function TechPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleDownloadOrders = async () => {
        setIsLoading(true);
        try {
            // Fetch orders from the API
            const response = await fetch('/api/get-orders');
            const orders: Order[] = await response.json();

            // Filter orders for the specified dates
            const targetOrders = orders.filter(order => {
                const orderDate = new Date(order.pickupDate);
                return (
                    (orderDate.getDate() === 18 && orderDate.getMonth() === 3 && orderDate.getFullYear() === 2025) ||
                    (orderDate.getDate() === 19 && orderDate.getMonth() === 3 && orderDate.getFullYear() === 2025)
                );
            });

            // Transform data for Excel
            const excelData = targetOrders.map(order => ({
                'Order ID': order.id,
                'Customer Email': order.user?.email || 'N/A',
                'Store': order.pickupStore?.name || 'N/A',
                'Items': order.items.map(item =>
                    `${item.product.name} (${item.quantity} x $${item.price})`
                ).join(', '),
                'Pickup Date': new Date(order.pickupDate).toLocaleDateString(),
                'Status': order.status,
                'Total': `$${order.total.toFixed(2)}`,
                'Note': order.note || '',
                'Created At': new Date(order.createdAt).toLocaleString(),
                'Updated At': new Date(order.updatedAt).toLocaleString(),
            }));

            // Create workbook and worksheet
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(excelData);

            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(wb, ws, 'Orders');

            // Generate Excel file
            XLSX.writeFile(wb, `orders_18-19_april_2025.xlsx`);
        } catch (error) {
            console.error('Error downloading orders:', error);
            alert('Failed to download orders. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Orders Export</h1>
            <p className="mb-4">Download orders for April 18-19, 2025 in Excel format</p>
            <button
                onClick={handleDownloadOrders}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
                {isLoading ? 'Downloading...' : 'Download Orders'}
            </button>
        </div>
    );
}
