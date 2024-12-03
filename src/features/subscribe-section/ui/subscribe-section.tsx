'use client'

import Image from 'next/image'
import { useState } from 'react'
import { AspectRatio } from '~/lib/ui/components/aspect-ratio'
import { Button } from '~/lib/ui/components/button'
import { Input } from '~/lib/ui/components/input'

export default function SubscribeSection() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Subscribed with email:', email)
  }

  return (
    <section className="group relative overflow-hidden rounded-lg">
      <AspectRatio ratio={21 / 9} className="relative">
        <Image
          src={'/images/asset-1.webp'}
          alt={'alt text'}
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-[2px]">
          <div className="absolute z-20 inset-0 flex items-center justify-center">
            <div className="max-w-2xl mx-auto text-center px-4">
              <h2 className="text-xl md:text-3xl font-bold mb-4 text-white">
                Prihláste sa na odber noviniek
              </h2>
              <p className="hidden md:block text-gray-200 mb-8">
                Buďte prvý, kto sa dozvie o našich nových receptoch, akciách a udalostiach.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-row gap-4 justify-center">
                <Input
                  type="email"
                  placeholder="Váš email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="max-w-sm bg-white/10 text-white placeholder:text-gray-300"
                  required
                />
                <Button type="submit" variant="secondary">
                  Prihlásiť sa
                </Button>
              </form>
            </div>
          </div>
        </div>
      </AspectRatio>
    </section>
  )
}
