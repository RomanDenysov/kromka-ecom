'use client'

import {type QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {loggerLink, unstable_httpBatchStreamLink} from '@trpc/client'
import {createTRPCReact} from '@trpc/react-query'
import type {inferRouterInputs, inferRouterOutputs} from '@trpc/server'
import React from 'react'
import SuperJSON from 'superjson'
import {env} from '~/env'
import type {AppRouter} from '~/server/api/root'
import {createQueryClient} from './query-client'

let clientQueryClientSingleton: QueryClient | undefined = undefined

const getQueryClient = () => {
	if (typeof window === 'undefined') {
		return createQueryClient()
	}
	if (clientQueryClientSingleton === undefined) {
		clientQueryClientSingleton = createQueryClient()
	}
	return clientQueryClientSingleton
}

export const api = createTRPCReact<AppRouter>()

export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>

export function TRPCReactProvider(props: {children: React.ReactNode}) {
	const queryClient = getQueryClient()

	const trpcClient = React.useMemo(
		() =>
			api.createClient({
				links: [
					loggerLink({
						enabled: (op) =>
							process.env.NODE_ENV === 'development' ||
							(op.direction === 'down' && op.result instanceof Error)
					}),
					unstable_httpBatchStreamLink({
						transformer: SuperJSON,
						url: `${BASE_URL}/api/trpc`,
						headers: () => {
							const headers = new Headers()
							headers.set('x-trpc-source', 'nextjs-react')
							return headers
						}
					})
				]
			}),
		[]
	)

	return (
		<QueryClientProvider client={queryClient}>
			<api.Provider client={trpcClient} queryClient={queryClient}>
				{props.children}
			</api.Provider>
		</QueryClientProvider>
	)
}

const BASE_URL = (() => {
	if (typeof window !== 'undefined') {
		return window.location.origin
	}
	if (env.NODE_ENV === 'development') {
		return 'http://localhost:3000'
	}
	return env.NEXT_PUBLIC_SERVER_URL
})()
