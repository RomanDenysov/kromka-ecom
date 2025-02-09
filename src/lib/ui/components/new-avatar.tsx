'use client'

import * as X from 'next/image'
import { ComponentPropsWithoutRef, HTMLAttributeReferrerPolicy, forwardRef, useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

const NextImage = X.default

/* -------------------------------------------------------------------------------------------------
 * Avatar
 * -----------------------------------------------------------------------------------------------*/

const AVATAR_NAME = 'Avatar'

// Create a context for the Avatar
const AvatarContext = createContext<AvatarContextValue | undefined>(undefined)

type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error'

type AvatarContextValue = {
    imageLoadingStatus: ImageLoadingStatus
    onImageLoadingStatusChange: (status: ImageLoadingStatus) => void
}

type AvatarProps = ComponentPropsWithoutRef<'span'>

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>((props, forwardedRef) => {
    const [imageLoadingStatus, setImageLoadingStatus] = useState<ImageLoadingStatus>('idle')

    const value = {
        imageLoadingStatus,
        onImageLoadingStatusChange: setImageLoadingStatus,
    }

    return (
        <AvatarContext.Provider value={value}>
            <span {...props} ref={forwardedRef} />
        </AvatarContext.Provider>
    )
})

Avatar.displayName = AVATAR_NAME

/* -------------------------------------------------------------------------------------------------
 * AvatarImage
 * -----------------------------------------------------------------------------------------------*/

const IMAGE_NAME = 'AvatarImage'

type AvatarImageProps = ComponentPropsWithoutRef<typeof NextImage> & {
    onLoadingStatusChange?: (status: ImageLoadingStatus) => void
}

const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>((props, forwardedRef) => {
    const { src, onLoadingStatusChange = () => { }, ...imageProps } = props
    const context = useContext(AvatarContext)

    const imageLoadingStatus = useImageLoadingStatus(src, imageProps.referrerPolicy)

    useEffect(() => {
        if (context) {
            if (imageLoadingStatus !== 'idle') {
                onLoadingStatusChange(imageLoadingStatus)
                context.onImageLoadingStatusChange(imageLoadingStatus)
            }
        }
    }, [imageLoadingStatus, context, onLoadingStatusChange])

    return imageLoadingStatus === 'loaded' ? (
        <NextImage {...imageProps} ref={forwardedRef} src={src} alt="" />
    ) : null
})

AvatarImage.displayName = IMAGE_NAME

/* -------------------------------------------------------------------------------------------------
 * AvatarFallback
 * -----------------------------------------------------------------------------------------------*/

const FALLBACK_NAME = 'AvatarFallback'

type AvatarFallbackProps = ComponentPropsWithoutRef<'span'> & {
    delayMs?: number
}

const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(
    (props, forwardedRef) => {
        const { delayMs, ...fallbackProps } = props
        const context = useContext(AvatarContext)
        const [canRender, setCanRender] = useState(delayMs === undefined)

        useEffect(() => {
            if (delayMs !== undefined) {
                const timerId = window.setTimeout(() => setCanRender(true), delayMs)
                return () => window.clearTimeout(timerId)
            }
        }, [delayMs])

        return canRender && context?.imageLoadingStatus !== 'loaded' ? (
            <span {...fallbackProps} ref={forwardedRef} />
        ) : null
    },
)

AvatarFallback.displayName = FALLBACK_NAME

/* -----------------------------------------------------------------------------------------------*/

function useImageLoadingStatus(
    src?: AvatarImageProps['src'],
    referrerPolicy?: HTMLAttributeReferrerPolicy,
) {
    const [loadingStatus, setLoadingStatus] = useState<ImageLoadingStatus>('idle')

    useEffect(() => {
        if (!src) {
            setLoadingStatus('error')
            return
        }

        let isMounted = true
        const image = new window.Image()

        const updateStatus = (status: ImageLoadingStatus) => () => {
            if (!isMounted) return
            setLoadingStatus(status)
        }

        setLoadingStatus('loading')
        image.onload = updateStatus('loaded')
        image.onerror = updateStatus('error')
        image.src = src as string
        if (referrerPolicy) {
            image.referrerPolicy = referrerPolicy
        }

        return () => {
            isMounted = false
        }
    }, [src, referrerPolicy])

    return loadingStatus
}

const Root = Avatar
const Image = AvatarImage
const Fallback = AvatarFallback

export { Avatar, AvatarFallback, AvatarImage, Fallback, Image, Root }
export type { AvatarFallbackProps, AvatarImageProps, AvatarProps }
