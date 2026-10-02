import s from './Footer.module.css';
import { site } from '../data/site';

export function Footer() {
  const { brand, descriptor, statement, supporting, copyright } = site.footer;

  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.inner}>
          <span className={s.brand}>
            <span className={s.brandName}>{brand}</span>
            <span className={s.descriptor}>{descriptor}</span>
          </span>
          <span className={s.statementGroup}>
            <span className={s.statement}>{statement}</span>
            {supporting ? <span className={s.supporting}>{supporting}</span> : null}
          </span>
        </div>
        <p className={s.copyright}>{copyright}</p>
      </div>
    </footer>
  );
}
