import { createBrowserRouter, RouterProvider, Navigate, useParams, useNavigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { MainLayout } from './components/Layout/MainLayout';
import { Loading } from './components/Common/Loading';
import { useI18n } from './hooks/useI18n';

// Lazy load pages
const Home = lazy(() => import('./pages/Home/Home'));
const ToolsListing = lazy(() => import('./pages/ToolsListing/ToolsListing'));
const ToolPage = lazy(() => import('./pages/ToolPage/ToolPage'));
const CategoryPage = lazy(() => import('./pages/Category/CategoryPage'));
const About = lazy(() => import('./pages/About/About'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

// Language wrapper component
function LanguageWrapper({ children }: { children: React.ReactNode }) {
  const { lang } = useParams<{ lang: string }>();
  const { changeLanguage, language } = useI18n();
  const navigate = useNavigate();

  useEffect(() => {
    if (lang && (lang === 'zh' || lang === 'en') && lang !== language) {
      changeLanguage(lang);
    }
  }, [lang, language, changeLanguage]);

  return <>{children}</>;
}

// Redirect component for routes without language
function RedirectToLanguage({ to }: { to: string }) {
  const { language } = useI18n();
  const targetLang = language || 'zh';
  
  return <Navigate to={`/${targetLang}${to}`} replace />;
}

const router = createBrowserRouter([
  // Root redirect to current language
  {
    path: '/',
    element: <RedirectToLanguage to="/" />,
  },
  
  // Old routes without language - redirect to current language
  {
    path: '/tools',
    element: <RedirectToLanguage to="/tools" />,
  },
  {
    path: '/tools/:category/:toolId',
    element: <RedirectToLanguage to={window.location.pathname} />,
  },
  {
    path: '/category/:categoryId',
    element: <RedirectToLanguage to={window.location.pathname} />,
  },
  {
    path: '/about',
    element: <RedirectToLanguage to="/about" />,
  },
  
  // Language-prefixed routes
  {
    path: '/:lang',
    element: (
      <LanguageWrapper>
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        </MainLayout>
      </LanguageWrapper>
    ),
  },
  {
    path: '/:lang/tools',
    element: (
      <LanguageWrapper>
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <ToolsListing />
          </Suspense>
        </MainLayout>
      </LanguageWrapper>
    ),
  },
  {
    path: '/:lang/tools/:category/:toolId',
    element: (
      <LanguageWrapper>
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <ToolPage />
          </Suspense>
        </MainLayout>
      </LanguageWrapper>
    ),
  },
  {
    path: '/:lang/category/:categoryId',
    element: (
      <LanguageWrapper>
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <CategoryPage />
          </Suspense>
        </MainLayout>
      </LanguageWrapper>
    ),
  },
  {
    path: '/:lang/about',
    element: (
      <LanguageWrapper>
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        </MainLayout>
      </LanguageWrapper>
    ),
  },
  {
    path: '*',
    element: (
      <MainLayout>
        <Suspense fallback={<Loading />}>
          <NotFound />
        </Suspense>
      </MainLayout>
    ),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

export default router;
