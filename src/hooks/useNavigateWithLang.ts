import { useI18n } from './useI18n';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback } from 'react';

export function useNavigateWithLang() {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const { language } = useI18n();

  const navigateWithLang = useCallback((to: string, options?: any) => {
    const currentLang = lang || language || 'zh';
    const path = to.startsWith('/') ? to : `/${to}`;
    const fullPath = `/${currentLang}${path}`;
    navigate(fullPath, options);
  }, [navigate, lang, language]);

  return navigateWithLang;
}

export function useCurrentLanguage() {
  const { lang } = useParams<{ lang: string }>();
  const { language } = useI18n();
  
  return lang || language || 'zh';
}

