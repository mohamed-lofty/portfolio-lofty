import { Link } from 'react-router-dom';
import s from './NotFoundPage.module.css';
import { usePageMeta } from '../hooks/usePageMeta';

export function NotFoundPage() {
  usePageMeta('Page not found — Lofty', 'This page does not exist.');

  return (
    <section className={s.page} aria-labelledby="notfound-title">
      <div className="container">
        <p className={s.kicker}>
          <span className={s.dot} aria-hidden="true" />
          404 — SIGNAL LOST
        </p>
        <h1 className={s.title} id="notfound-title">
          This page doesn’t exist.
        </h1>
        <p className={s.text}>
          The address may have changed, or the loop came back around to a page that never shipped.
        </p>
        <Link className="btn btn-primary" to="/">
          Back to home
        </Link>
      </div>
    </section>
  );
}
