'use client'

import {useEffect} from 'react'
import {
	useCookieConsentBannerStore,
	useCookieConsentStore,
} from '~/lib/store/cookie-consent'
import {useProfileStore} from '~/lib/store/profile-store'
import {Button} from '~/lib/ui/components/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '~/lib/ui/components/card'
import {Label} from '~/lib/ui/components/label'
import {Switch} from '~/lib/ui/components/switch'
import {
	COOKIE_CONSENT_BANNER_DEFAULTS,
	type CookieConsentBannerProps,
} from './config'

type Props = {
	onAccept: (preferences: Record<string, boolean>) => void
	onReject: () => void
} & CookieConsentBannerProps

export default function CookieConsentBunner({
	onAccept,
	onReject,
	...props
}: Props) {
	const {isVisible, setIsVisible} = useCookieConsentBannerStore((state) => ({
		isVisible: state.isVisible,
		setIsVisible: state.setIsVisible,
	}))
	const {preferences, setPreferences, hasConsented} = useCookieConsentStore(
		(state) => ({
			preferences: state.preferences,
			setPreferences: state.setPreferences,
			hasConsented: state.hasConsented,
		}),
	)
	const initialize = useProfileStore((state) => state.initialize)

	const {cookieOptions, acceptLabel, rejectLabel, title, message} =
		COOKIE_CONSENT_BANNER_DEFAULTS

	useEffect(() => {
		const timer = setTimeout(() => {
			if (!hasConsented()) {
				setIsVisible(true)
			}
		}, 2000)

		return () => clearTimeout(timer)
	}, [hasConsented, setIsVisible])

	const handleAccept = () => {
		onAccept(preferences)
		setIsVisible(false)
		initialize()
	}

	const handleReject = () => {
		onReject()
		setPreferences(
			cookieOptions.reduce(
				(acc, option) => {
					acc[option.id] = option.id === 'essential'
					return acc
				},
				{} as Record<string, boolean>,
			),
		)
		setIsVisible(false)
	}

	const handleToggle = (id: string) => {
		setPreferences({
			...preferences,
			[id]: !preferences[id],
		})
	}

	if (!isVisible) return null
	return (
		<div>
			<Card>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
					<CardDescription>{message}</CardDescription>
				</CardHeader>
				<CardContent>
					<div>
						{cookieOptions.map((option) => (
							<div key={option.id}>
								<Label>{option.label}</Label>
								<p>{option.description}</p>
								<Switch
									id={option.id}
									checked={preferences[option.id]}
									onCheckedChange={() => handleToggle(option.id)}
									disabled={option.id === 'essential'}
								/>
							</div>
						))}
					</div>
				</CardContent>
				<CardFooter className='flex justify-between'>
					<Button variant='outline' onClick={handleReject}>
						{rejectLabel}
					</Button>
					<Button onClick={handleAccept}>{acceptLabel}</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
