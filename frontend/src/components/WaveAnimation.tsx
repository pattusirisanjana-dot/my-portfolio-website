import "../styles/waves.css";

interface WaveAnimationProps {
  className?: string;
}

export default function WaveAnimation({ className = "" }: WaveAnimationProps) {
  return (
    <div className={`wave-animation ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 220" preserveAspectRatio="none">
        <path className="wave-line wave-line--one" d="M-80 126 C 110 42, 250 42, 430 126 S 750 210, 930 126 S 1250 42, 1520 126" />
        <path className="wave-line wave-line--two" d="M-80 148 C 120 68, 260 68, 450 148 S 770 228, 960 148 S 1270 68, 1520 148" />
        <path className="wave-line wave-line--three" d="M-80 166 C 130 106, 280 106, 470 166 S 790 226, 980 166 S 1290 106, 1520 166" />
        <path className="wave-line wave-line--four" d="M-80 104 C 130 178, 290 178, 480 104 S 800 30, 990 104 S 1300 178, 1520 104" />
      </svg>
    </div>
  );
}