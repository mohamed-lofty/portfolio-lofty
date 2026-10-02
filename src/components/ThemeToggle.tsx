import { Monitor, Moon, Sun } from 'lucide-react';
import s from './ThemeToggle.module.css';
import type { ThemePreference } from '../hooks/useTheme';

interface ThemeToggleProps {
  theme: ThemePreference;
  nextTheme: ThemePreference;
  onToggle: () => void;
}

const ICONS = {
  system: Monitor,
  light: Sun,
  dark: Moon,
} as const;

const LABELS: Record<ThemePreference, string> = {
  system: 'system preference',
  light: 'light',
  dark: 'dark',
};

export function ThemeToggle({ theme, nextTheme, onToggle }: ThemeToggleProps) {
  const Icon = ICONS[theme];

  return (
    <button
      type="button"
      className={s.toggle}
      onClick={onToggle}
      aria-label={`Theme: ${LABELS[theme]}. Switch to ${LABELS[nextTheme]}.`}
      title={`Theme: ${LABELS[theme]}`}
    >
      <Icon size={15} strokeWidth={1.75} aria-hidden="true" className={s.icon} key={theme} />
    </button>
  );
}
