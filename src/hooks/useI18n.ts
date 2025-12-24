import { useEffect, useState } from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation as useI18nextTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

let isInitialized = false;
let initPromise: Promise<void> | null = null;

export function initI18n() {
  if (isInitialized) return Promise.resolve();
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      // Load translations first
      const zhResponse = await fetch('/locales/zh/common.json');
      const enResponse = await fetch('/locales/en/common.json');
      
      const zhTranslations = await zhResponse.json();
      const enTranslations = await enResponse.json();

      await i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
          fallbackLng: 'zh',
          lng: 'zh',
          supportedLngs: ['zh', 'en'],
          detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
          },
          interpolation: {
            escapeValue: false,
          },
          resources: {
            zh: {
              common: zhTranslations,
            },
            en: {
              common: enTranslations,
            },
          },
          ns: ['common'],
          defaultNS: 'common',
          react: {
            useSuspense: false,
          },
        });

      isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize i18n:', error);
    }
  })();

  return initPromise;
}

export function useI18n() {
  const { t, i18n } = useI18nextTranslation();
  const [isReady, setIsReady] = useState(i18n.isInitialized);

  useEffect(() => {
    if (!i18n.isInitialized) {
      initI18n().then(() => setIsReady(true));
    }
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return {
    t,
    language: i18n.language,
    changeLanguage,
    languages: i18n.languages || ['zh', 'en'],
    isReady,
  };
}

