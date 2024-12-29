import { Share2Icon } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '~/lib/ui/components/button'
import type { Post } from '~/server/payload/payload-types'

const ShareButton = ({ post, className }: { post: Post; className?: string }) => {
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)

    const shareData = {
      title: post.title,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        toast.info('Thank you for sharing!')
      } else {
        // Fallback to copying URL
        await navigator.clipboard.writeText(window.location.href)
        toast.info('Link copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
      toast.error('Failed to share. Please try again.')
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      disabled={isSharing}
      className={className}
    >
      <Share2Icon className="mr-2 h-4 w-4" />
      {isSharing ? 'Sharing...' : 'Share'}
    </Button>
  )
}

export default ShareButton
