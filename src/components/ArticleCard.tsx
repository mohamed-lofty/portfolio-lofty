import { Link } from 'react-router-dom';
import s from './ArticleCard.module.css';
import { useReveal } from '../hooks/useReveal';
import type { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  delay?: number;
}

export function ArticleCard({ article, delay = 0 }: ArticleCardProps) {
  const { revealProps } = useReveal<HTMLDivElement>(delay);

  return (
    <div {...revealProps} className={s.wrap}>
      <article className={s.card}>
      <p className={s.meta}>
        <time dateTime={article.date}>{article.date}</time>
        {article.tags.map((tag) => (
          <span key={tag} className={s.tag}>
            {tag}
          </span>
        ))}
      </p>

      <h3 className={s.title}>
        <Link className={s.link} to={`/thinking/${article.slug}`}>
          {article.title}
        </Link>
      </h3>

      <p className={s.excerpt}>{article.excerpt}</p>
      </article>
    </div>
  );
}
