import { memo } from "react"
import Hero from "../components/Hero"
import Projects from "../components/Projects"
import Footer from "../components/Footer"
import Contact from "../components/Contact"

function Home(){
    return <div>
        <Hero/>
        <Projects/>
        <Contact/>
        <Footer/>
    </div>
}
export default memo(Home)