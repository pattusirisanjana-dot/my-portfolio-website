import { siGithub } from "simple-icons";
import type { SocialProfile } from "../data/portfolio";

interface SocialIconProps {
  platform: SocialProfile["platform"];
  size: number;
  className?: string;
}

const linkedinPath =
  "M6.94 8.5a1.56 1.56 0 1 1 0-3.12 1.56 1.56 0 0 1 0 3.12ZM5.68 10.25h2.53v8.12H5.68Zm4.3 0h2.42v1.08h.03c.34-.64 1.17-1.31 2.41-1.31 2.58 0 3.06 1.7 3.06 3.9v4.45h-2.53v-4.16c0-.96-.02-2.2-1.34-2.2-1.34 0-1.55 1.04-1.55 2.12v4.24H9.98Z";

const brandIcons = {
  github: siGithub,
  linkedin: { path: linkedinPath },
};

export default function SocialIcon({
  platform,
  size,
  className,
}: SocialIconProps) {
  const icon = brandIcons[platform];

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      focusable="false"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <path d={icon.path} />
    </svg>
  );
}
