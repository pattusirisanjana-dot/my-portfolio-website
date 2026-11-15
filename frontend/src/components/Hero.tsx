import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { socialProfiles } from "../data/portfolio";
import SocialIcon from "./SocialIcon";
import WaveAnimation from "./WaveAnimation";
import "../styles/hero.css";

export default function Hero() {
  const [photoUnavailable, setPhotoUnavailable] = useState(false);

  return (
    <section className="hero-section" id="home">
      <div className="hero-inner section-shell">
        <div className="hero-copy">
          <p className="eyebrow"><span /> HELLO, I&apos;M</p>
          <h1>Pattusuri<br /><span>Sanjana.</span></h1>
          <p className="hero-role">AIML Engineer in Making.</p>
          <p className="hero-description">
            Exploring artificial intelligence, machine learning and software
            development to build meaningful technology.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">EXPLORE PROJECTS <span>↘</span></a>
            <a className="button button-text" href="#contact">GET IN TOUCH <span>↗</span></a>
          </div>
          <div className="hero-socials" aria-label="Social profiles">
            {socialProfiles.map((profile) => {
              return (
                <a
                  className="hero-social-link"
                  href={profile.href}
                  key={profile.platform}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label={`Visit Sanjana's ${profile.name} profile (opens in a new tab)`}
                >
                  <SocialIcon platform={profile.platform} size={16} />
                  <span>{profile.name}</span>
                  <ArrowUpRight aria-hidden="true" className="social-arrow" size={13} />
                </a>
              );
            })}
          </div>
          <p className="hero-index">THINK <i>·</i> EXPLORE <i>·</i> BUILD</p>
        </div>
        <div className="hero-visual">
          <div className="portrait-frame">
            <div className="portrait-surface">
              {!photoUnavailable && (
                <img
                  src="/images/sanjana-profile.jpg"
                  alt="Pattusuri Sanjana"
                  onError={() => setPhotoUnavailable(true)}
                />
              )}
              {photoUnavailable && (
                <div className="portrait-placeholder" aria-label="Portrait not provided">
                  <span>PS</span><small>PORTRAIT</small>
                </div>
              )}
            </div>
            <span className="portrait-corner portrait-corner--top" />
            <span className="portrait-corner portrait-corner--bottom" />
          </div>
          <div className="visual-caption">
            <span>01 — A LITTLE INTRODUCTION</span>
            <span>BASED IN INDIA <i>·</i> OPEN TO IDEAS</span>
          </div>
          <span className="hero-orbit hero-orbit--one" />
          <span className="hero-orbit hero-orbit--two" />
        </div>
      </div>
      <div className="hero-scroll"><span /> SCROLL TO EXPLORE</div>
      <WaveAnimation className="hero-waves" />
    </section>
  );
}