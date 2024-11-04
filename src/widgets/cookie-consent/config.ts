type CookieOption = {
	id: string
	label: string
	description: string
}

export type CookieConsentBannerProps = {
	title: string
	message: string
	acceptLabel: string
	rejectLabel: string
	cookieOptions: CookieOption[]
}

export const COOKIE_CONSENT_BANNER_DEFAULTS: CookieConsentBannerProps = {
	title: 'Cookie Consent',
	message:
		'We use cookies to ensure you have the best experience on our website.',
	acceptLabel: 'Accept',
	rejectLabel: 'Reject',
	cookieOptions: [
		{
			id: 'analytics',
			label: 'Analytics',
			description:
				'Analytics cookies help us understand how you use our website.',
		},
		{
			id: 'marketing',
			label: 'Marketing',
			description: 'Marketing cookies help us display advertisements.',
		},
		{
			id: 'essential',
			label: 'Essential',
			description:
				'Essential cookies are required for the website to function properly.',
		},
	],
}
