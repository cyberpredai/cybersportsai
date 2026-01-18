import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className="relative min-h-screen pb-32">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
