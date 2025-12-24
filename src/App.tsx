import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Router } from './router';
import { initI18n } from './hooks/useI18n';
import { Loading } from './components/Common/Loading';

function App() {
  const [isI18nReady, setIsI18nReady] = useState(false);

  useEffect(() => {
    // Initialize i18n
    initI18n().then(() => {
      setIsI18nReady(true);
    });
  }, []);

  if (!isI18nReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Router />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--card-bg)',
            color: 'var(--foreground)',
            border: '1px solid var(--border-color)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </HelmetProvider>
  );
}

export default App;
