import s from './Placeholder.module.css';

/**
 * Elegant placeholder for content that does not exist yet.
 * Used instead of inventing information.
 */
export function Placeholder({ text }: { text?: string }) {
  return <p className={s.placeholder}>{text ?? 'Detailed project information coming soon.'}</p>;
}
