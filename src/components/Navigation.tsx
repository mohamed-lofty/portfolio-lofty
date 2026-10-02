import { useEffect, useId, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import s from './Navigation.module.css';
import { ThemeToggle } from './ThemeToggle';
import { cx } from '../lib/cx';
import { site } from '../data/site';
import type { ThemePreference } from '../hooks/useTheme';

interface NavigationProps {
  theme: ThemePreference;
  nextTheme: ThemePreference;
  onToggleTheme: () => void;
}

type MenuState = 'closed' | 'open' | 'closing';

/** exit animation length — the menu is removed from the DOM after this */
const CLOSE_MS = 320;

function isRouteActive(pathname: string, to: string): boolean {
  if (to === '/') return pathname === '/';
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function Navigation({ theme, nextTheme, onToggleTheme }: NavigationProps) {
  const [menu, setMenu] = useState<MenuState>('closed');
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | null>(null);
  const menuId = useId();
  const { pathname } = useLocation();

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenu = () => {
    cancelClose();
    setMenu('open');
  };

  const closeMenu = () => {
    cancelClose();
    setMenu('closing');
    closeTimer.current = window.setTimeout(() => {
      setMenu('closed');
      closeTimer.current = null;
    }, CLOSE_MS);
  };

  // Close the menu if the route changes while it is open (e.g. browser back).
  // When it is already closing, let the exit animation finish naturally.
  const [previousPath, setPreviousPath] = useState(pathname);
  if (previousPath !== pathname) {
    setPreviousPath(pathname);
    if (menu === 'open') setMenu('closed');
  }

  useEffect(
    () => () => {
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (menu === 'closed') return;

    const requestClose = () => {
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
      setMenu('closing');
      closeTimer.current = window.setTimeout(() => {
        setMenu('closed');
        closeTimer.current = null;
      }, CLOSE_MS);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') requestClose();
    };

    const onPointerDown = (event: PointerEvent) => {
      const header = headerRef.current;
      if (header && event.target instanceof Node && !header.contains(event.target)) {
        requestClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menu]);

  const isOpen = menu !== 'closed';

  return (
    <header className={s.header} ref={headerRef}>
      <nav className={s.nav} aria-label="Primary">
        <div className={s.pill}>
          <Link to="/" className={s.mark} onClick={() => closeMenu()}>
            <span className={s.markDot} aria-hidden="true" />
            {site.name}
          </Link>

          <ul className={s.links}>
            {site.nav.map((item) => {
              const isActive = isRouteActive(pathname, item.to);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cx(s.link, isActive && s.linkActive)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={s.actions}>
            <ThemeToggle theme={theme} nextTheme={nextTheme} onToggle={onToggleTheme} />
            <button
              type="button"
              className={s.menuButton}
              aria-expanded={menu === 'open'}
              aria-controls={menuId}
              onClick={() => (menu === 'open' ? closeMenu() : openMenu())}
            >
              <span className="visually-hidden">
                {menu === 'open' ? 'Close menu' : 'Open menu'}
              </span>
              {isOpen ? (
                <X size={16} strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Menu size={16} strokeWidth={1.75} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <div className={s.menu} id={menuId} data-state={menu} hidden={menu === 'closed'}>
          <p className={s.menuLabel}>NAVIGATION</p>
          <ul className={s.menuList} style={{ '--n': site.nav.length } as CSSProperties}>
            {site.nav.map((item, index) => {
              const isActive = isRouteActive(pathname, item.to);
              return (
                <li key={item.to} style={{ '--i': index } as CSSProperties}>
                  <Link
                    to={item.to}
                    className={cx(s.menuLink, isActive && s.menuLinkActive)}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => closeMenu()}
                  >
                    <span className={s.menuIndex} aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
