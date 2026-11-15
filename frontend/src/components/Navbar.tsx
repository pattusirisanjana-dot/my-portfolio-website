import "../styles/navbar.css";

const links = [
  { number: "01", label: "Home", href: "#home" },
  { number: "02", label: "Projects", href: "#projects" },
  { number: "03", label: "Skills", href: "#skills" },
  { number: "04", label: "About", href: "#about" },
  { number: "05", label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Pattusuri Sanjana, home">PS<span>.</span></a>
      <nav className="site-nav" aria-label="Main navigation">
        {links.map((link) => (
          <a key={link.number} href={link.href}>
            <span>{link.number}</span> {link.label}
          </a>
        ))}
      </nav>
      <a className="header-note" href="#contact">LET&apos;S CONNECT <span>↗</span></a>
    </header>
  );
}