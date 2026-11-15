import { useEffect, useState } from "react";
import WaveAnimation from "./WaveAnimation";
import "../styles/intro.css";

interface IntroAnimationProps {
  onComplete: () => void;
}

const INTRO_DURATION_MS = 5000;
const EXIT_DURATION_MS = 500;

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timeout = window.setTimeout(
      () => setLeaving(true),
      reducedMotion ? 0 : INTRO_DURATION_MS - EXIT_DURATION_MS,
    );
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!leaving) return;
    const timeout = window.setTimeout(onComplete, EXIT_DURATION_MS);
    return () => window.clearTimeout(timeout);
  }, [leaving, onComplete]);

  return (
    <section
      className={`intro-screen${leaving ? " intro-screen--leaving" : ""}`}
      aria-label="Portfolio introduction"
      aria-live="polite"
    >
      <div className="intro-topline">
        <span className="intro-mark">PS<span>.</span></span>
        <span className="intro-edition">PORTFOLIO <i>/</i> 2026</span>
      </div>
      <div className="intro-content">
        <p className="intro-welcome intro-reveal">WELCOME TO MY DIGITAL SPACE</p>
        <div className="intro-rule intro-reveal" />
        <h1 className="intro-name intro-reveal">PATTUSURI <span>SANJANA.</span></h1>
        <p className="intro-role intro-reveal">AIML Engineer in Making.</p>
        <p className="intro-mantra intro-reveal">THINK. EXPLORE. BUILD.</p>
      </div>
      <p className="intro-entering">ENTERING PORTFOLIO <span>· 2026</span></p>
      <WaveAnimation className="intro-waves" />
      <button className="intro-skip" type="button" onClick={() => setLeaving(true)}>
        Skip intro <span aria-hidden="true">↗</span>
      </button>
    </section>
  );
}
