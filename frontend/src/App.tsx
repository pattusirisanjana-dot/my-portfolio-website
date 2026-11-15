import { useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import IntroAnimation from "./components/IntroAnimation";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import "./styles/global.css";

const INTRO_SEEN_KEY = "sanjana-portfolio-intro-seen";

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) === "true";
  } catch (error) {
    console.warn("Intro session storage is unavailable; showing the intro.", error);
    return false;
  }
}

export default function App() {
  const [showIntro, setShowIntro] = useState(() => !hasSeenIntro());

  const finishIntro = () => {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "true");
    } catch (error) {
      console.warn("Could not save intro completion for this browser session.", error);
    }
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <IntroAnimation onComplete={finishIntro} />}
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
