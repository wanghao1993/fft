import { EmblaCarousel } from "../carousel";

export default async function Hero() {
  return (
    <section className="relative w-full">
      <div className="text-center max-w-4xl mx-auto">
        <div className="hidden md:flex md:flex-start">
          <EmblaCarousel />
        </div>
      </div>
    </section>
  );
}
