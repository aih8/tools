import { Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from '@/components/Common/Link';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>

      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-2">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 btn btn-primary"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>
      </div>
    </>
  );
}

