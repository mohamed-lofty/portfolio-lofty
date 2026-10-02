import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Placeholder domain — replace with the real domain once the site is live. */
export const BASE_URL = 'https://example.com/';

function setMeta(selector: string, attribute: string, value: string) {
  const element = document.head.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
}

/**
 * Per-page SEO: title, description, canonical URL and Open Graph tags.
 * Every page calls this — nothing else needs to touch the document head.
 */
export function usePageMeta(title: string, description?: string) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;

    if (description) {
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[property="og:description"]', 'content', description);
    }

    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('link[rel="canonical"]', 'href', new URL(pathname, BASE_URL).href);
    setMeta('meta[property="og:url"]', 'content', new URL(pathname, BASE_URL).href);
  }, [title, description, pathname]);
}
