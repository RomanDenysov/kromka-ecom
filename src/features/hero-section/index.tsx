import Balancer from 'react-wrap-balancer'
import { SearchInput } from './search-input'

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center py-40 lg:py-80">
      <div className="space-y-4">
        <h1 className="max-w-2xl text-center font-bold text-5xl tracking-tight md:text-7xl">
          <Balancer>{'S láskou ku kvásku'}</Balancer>
        </h1>
        <p className="max-w-2xl text-center text-muted-foreground text-xl leading-relaxed tracking-tight md:text-2xl">
          {
            'V Kromke to vonia čerstvým kváskovým chebom, koláčmi a kávou, a teraz sme aj online! Vitajte na našom eshope, veríme, že si nájdete lakocinky podľa svojej chuti.'
          }
        </p>
      </div>

      <center className="mt-10 flex w-full max-w-2xl place-content-center">
        <SearchInput />
      </center>
    </section>
  )
}
