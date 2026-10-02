import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import s from './ArticlePage.module.css';
import { usePageMeta } from '../hooks/usePageMeta';
import { getArticleBySlug } from '../data/articles';

export function ArticlePage() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  usePageMeta(
    article ? `${article.title} — Mohamed Lotfy` : 'Note not found — Mohamed Lotfy',
    article?.description ?? article?.excerpt,
  );

  if (!article) {
    return <Navigate to="/thinking" replace />;
  }

  return (
    <article className={s.page}>
      <div className={`container ${s.inner}`}>
        <Link className={s.back} to="/thinking">
          <ArrowLeft size={13} strokeWidth={2} aria-hidden="true" />
          BACK TO THINKING
        </Link>

        <header className={s.header}>
          <p className={s.meta}>
            <time dateTime={article.date}>{article.date}</time>
            {article.tags.map((tag) => (
              <span key={tag} className={s.tag}>
                {tag}
              </span>
            ))}
          </p>
          <h1 className={s.title}>{article.title}</h1>
          <p className={s.excerpt}>{article.excerpt}</p>
        </header>

        <div className={s.body}>
          {article.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className={s.paragraph}>
              {paragraph}
            </p>
          ))}

          {article.blocks?.map((block, index) => {
            const key = `${block.kind}-${index}`;

            if (block.kind === 'heading') {
              return (
                <h2 key={key} className={s.sectionTitle}>
                  {block.text}
                </h2>
              );
            }

            if (block.kind === 'list') {
              return (
                <ul key={key} className={s.list}>
                  {block.items.map((item) => (
                    <li key={item} className={s.listItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={key} className={s.paragraph}>
                {block.text}
              </p>
            );
          })}
        </div>
      </div>
    </article>
  );
}
