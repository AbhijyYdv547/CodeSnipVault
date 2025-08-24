
import AboutSection from "@/components/about-section";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import ResizableNav from "@/components/navbar";


export default function Home() {
  return (
    <>
      <ResizableNav />
      <div className="max-w-7xl mx-auto pt-24 px-6"> 
        <HeroSection/>
        <AboutSection/>
        <Footer/>
      </div>
    </>
  );
}
