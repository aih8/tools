import { Link as RouterLink } from 'react-router-dom';
import type { ComponentProps } from 'react';
import { useCurrentLanguage } from '@/hooks/useNavigateWithLang';

type LinkProps = ComponentProps<typeof RouterLink>;

export function Link({ to, ...props }: LinkProps) {
  const currentLang = useCurrentLanguage();
  
  // If to is a string and doesn't start with language prefix
  const href = typeof to === 'string' 
    ? (to.startsWith('/zh/') || to.startsWith('/en/') ? to : `/${currentLang}${to}`)
    : to;
  
  return <RouterLink to={href} {...props} />;
}

