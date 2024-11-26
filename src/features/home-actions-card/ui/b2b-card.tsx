import Image from 'next/image'

const B2BCard = () => {
  return (
    <div className="relative aspect-auto h-60 w-full rounded-lg bg-muted md:h-80">
      <Image
        src={'/images/asset-1.jpg'}
        alt={'alt text'}
        fill
        className="absolute inset-0 z-10 rounded-lg object-cover object-center"
      />
    </div>
  )
}

export default B2BCard
