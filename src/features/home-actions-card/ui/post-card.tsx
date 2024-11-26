import Image from 'next/image'

const PostCard = () => {
  return (
    <div className="relative h-60 w-full rounded-lg bg-muted md:aspect-square md:size-80">
      <Image
        src={'/images/asset-1.jpg'}
        alt={'alt text'}
        fill
        className="rounded-lg object-cover object-center"
      />
    </div>
  )
}

export default PostCard
