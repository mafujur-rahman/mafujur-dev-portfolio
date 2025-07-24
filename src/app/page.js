
import AboutMe from "@/components/Home/About/About";
import Banner from "@/components/Home/Banner/Banner";
import Contact from "@/components/Home/Contact/Contact";
import Recognition from "@/components/Home/Recognition/Recognition";
import Skills from "@/components/Home/Skills/Skills";
import Projects from "@/components/Projects/Projects";
import { Navbar } from "@/components/shared/Navbar/Navbar";


export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <AboutMe />
      <Skills />
      <Projects />
      <Recognition />
      <Contact />
    </div>
  );
}
