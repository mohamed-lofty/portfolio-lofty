import { Route, BrowserRouter } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { RouteTransition } from './components/RouteTransition';
import { PointerSignal } from './components/PointerSignal';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { SystemsPage } from './pages/SystemsPage';
import { ThinkingPage } from './pages/ThinkingPage';
import { ArticlePage } from './pages/ArticlePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, nextTheme, cycleTheme } = useTheme();

  return (
    <BrowserRouter>
      <PointerSignal />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navigation theme={theme} nextTheme={nextTheme} onToggleTheme={cycleTheme} />

      <main id="main" tabIndex={-1}>
        <RouteTransition>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="/systems" element={<SystemsPage />} />
          <Route path="/thinking" element={<ThinkingPage />} />
          <Route path="/thinking/:slug" element={<ArticlePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </RouteTransition>
      </main>

      <Footer />
    </BrowserRouter>
  );
}
