
import AboutSection from "@/components/about-section";
import DemoSection from "@/components/demo-section";
import FeaturesSection from "@/components/feature-section";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import ResizableNav from "@/components/navbar";
import Workflow from "@/components/workflow-section";


export default function Home() {
  return (
    <>
      <ResizableNav />
      <div className="max-w-7xl mx-auto pt-24 px-6"> 
        <HeroSection/>
        <AboutSection/>
        <FeaturesSection/>
        <Workflow/>
        <DemoSection/>
        <Footer/>
      </div>
    </>
  );
}
