import { TRPCReactProvider } from '~/trpc/react'
import SheetsProvider from './sheet-provider'

export const Providers = ({children}: {children: React.ReactNode}) => {

	return (
  	<TRPCReactProvider>
     	<SheetsProvider/>
     	{children}
  	</TRPCReactProvider>
	)
}
