import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/Common/ThemeToggle';
import { Link } from '@/components/Common/Link';
import { useConfig } from '@/hooks/useConfig';
import { useI18n } from '@/hooks/useI18n';
import { useCurrentLanguage } from '@/hooks/useNavigateWithLang';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import styles from './Header.module.css';
import { getEnabledCategories } from '@/config/categories';

export function Header() {
  const { siteConfig } = useConfig();
  const { t, changeLanguage } = useI18n();
  const currentLang = useCurrentLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const categories = getEnabledCategories();

  const navLinks = [
    { path: '/', label: t('site.home') },
    { path: '/tools', label: t('site.tools') },
    { path: '/about', label: t('site.about') },
  ];

  const isActive = (path: string) => {
    const currentPath = location.pathname.replace(/^\/(zh|en)/, '');
    if (path === '/') return currentPath === '' || currentPath === '/';
    return currentPath.startsWith(path);
  };

  const handleLanguageChange = (newLang: string) => {
    // Get current path without language prefix
    const pathWithoutLang = location.pathname.replace(/^\/(zh|en)/, '') || '/';
    // Navigate to new language path
    navigate(`/${newLang}${pathWithoutLang}`);
    changeLanguage(newLang);
  };

  return (
    <header className={`${styles.header} sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={styles.logo}>
                {siteConfig?.siteName || '站长工具箱'}
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`${styles.desktopNav} hidden md:flex items-center space-x-6`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${styles.navLink} font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 ${
                  isActive(link.path) ? styles.active + ' text-primary-600 dark:text-primary-400' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Category Dropdown */}
            <div className="relative group">
              <button className="font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1">
                {t('site.categories')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200 dark:border-gray-700">
                {categories.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.id}`}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {t(cat.nameKey)}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />

            {/* Language Switcher */}
            <select
              value={currentLang}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="zh">中文</option>
              <option value="en">English</option>
            </select>

            {/* Mobile Menu Button */}
            <button
              className={`${styles.mobileMenuBtn} p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors md:hidden`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700 mt-2 pt-4"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2.5 px-4 rounded-lg font-medium ${
                    isActive(link.path)
                      ? 'bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{t('site.categories')}</p>
                {categories.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.id}`}
                    className="block py-2 px-4 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(cat.nameKey)}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
