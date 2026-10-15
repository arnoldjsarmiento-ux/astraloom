import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TechStrip from '../components/TechStrip'
import Services from '../components/Services'
import Process from '../components/Process'
import Portfolio from '../components/Portfolio'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechStrip />
        <Services />
        <Process />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
