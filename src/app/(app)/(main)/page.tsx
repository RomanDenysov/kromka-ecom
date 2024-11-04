import { HeroGrid } from "~/features/hero-grid/ui";
import { Container } from "~/lib/ui/container";

export default function HomePage() {
	return (
		<Container className='py-5 md:py-10 space-y-10'>
			<HeroGrid/>

		</Container>
	)
}
