import Header from "./components/Header";
import PrimaryFeatures from "./components/PrimaryFeatures";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function LandingPage() {
  return (
  <>
    <Header /> 
    <Hero />
    <PrimaryFeatures />
    <Testimonials />
    <Footer />
  </>
  );
}