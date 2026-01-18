const socialLinks = [
  {
    label: "X",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path
          d="M6 4h4.2l3.1 4.3L17.5 4H21l-6.2 7.8L21.5 20h-4.2l-3.6-4.8L9.9 20H6.3l6.8-8.2L6 4z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path
          d="M19.3 6.2c-1.3-.6-2.7-1-4.1-1.2l-.5 1.1a13.7 13.7 0 0 0-3.4 0l-.5-1.1c-1.4.2-2.8.6-4.1 1.2-2 2.9-2.6 5.8-2.3 8.7 1.6 1.2 3.2 2 5 2.5l.8-1.3c-.9-.3-1.7-.7-2.5-1.2.2-.1.4-.3.6-.4 3 .9 6.2.9 9.2 0 .2.1.4.3.6.4-.8.5-1.6.9-2.5 1.2l.8 1.3c1.8-.5 3.4-1.3 5-2.5.3-2.9-.3-5.8-2.3-8.7z"
          fill="currentColor"
        />
        <path
          d="M9.4 14.4c-.7 0-1.3-.7-1.3-1.5s.6-1.5 1.3-1.5 1.3.7 1.3 1.5-.6 1.5-1.3 1.5zm5.2 0c-.7 0-1.3-.7-1.3-1.5s.6-1.5 1.3-1.5 1.3.7 1.3 1.5-.6 1.5-1.3 1.5z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path
          d="M20.7 5.2 3.8 11.8c-1 .4-1 1.8 0 2.1l4.2 1.3 1.6 4.9c.2.7 1.1.9 1.6.4l2.4-2.4 4.6 3.4c.6.4 1.5.1 1.7-.7l2.5-12.9c.2-1-.7-1.8-1.7-1.4z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ul className="flex items-center gap-6">
        {socialLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              aria-label={link.label}
              className="text-slate-300 transition-all duration-200 hover:text-[#14F195]"
            >
              {link.svg}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
