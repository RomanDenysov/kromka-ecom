import Image from "next/image";
import Link from "next/link";
import { cn } from "~/lib/utils/cn";

type Props = {
    href: string
    title: string
    description: string
    image: string
    className?: string
}

export function MarketingBanner({ href, title, description, image, className }: Props) {
    return (
        <Link
            prefetch
            href={href}
            className={cn(
                'flex aspect-video group flex-col items-center justify-center rounded-md overflow-hidden bg-muted p-6 relative shadow-lg',
                className,
            )}
        >
            <Image
                src={image}
                alt={title}
                fill
                className="absolute inset-0 object-cover object-center z-0 md:group-hover:scale-105 transition-all duration-300"
            />
            {/* Gradient overlay for top and bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 z-[1]" />
            <div className="z-10 flex flex-col items-center gap-4 text-center">
                <h3 className="text-2xl md:text-4xl font-bold text-secondary drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">{title}</h3>
                <p className="text-muted max-w-xl font-medium text-base leading-relaxed tracking-tight md:text-2xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                    {description}
                </p>
            </div>
        </Link>
    )
}
