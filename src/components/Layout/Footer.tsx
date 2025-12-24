import { Github, Twitter, Heart } from 'lucide-react';
import { Link } from '@/components/Common/Link';
import { useConfig } from '@/hooks/useConfig';
import { useI18n } from '@/hooks/useI18n';
import styles from './Footer.module.css';

export function Footer() {
  const { siteConfig } = useConfig();
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} bg-gray-50 dark:bg-slate-900 mt-20 border-t border-gray-200 dark:border-gray-800`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
              {siteConfig?.siteName || '站长工具箱'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {siteConfig?.description || '免费在线站长工具集合'}
            </p>
            <div className="flex space-x-4">
              {siteConfig?.social?.github && (
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.socialIcon} text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400`}
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {siteConfig?.social?.twitter && (
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.socialIcon} text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400`}
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-gray-900 dark:text-gray-100">
              {t('site.quickLinks')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className={`${styles.footerLink} text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400`}>
                  {t('site.home')}
                </Link>
              </li>
              <li>
                <Link to="/tools" className={`${styles.footerLink} text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400`}>
                  {t('site.tools')}
                </Link>
              </li>
              <li>
                <Link to="/about" className={`${styles.footerLink} text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400`}>
                  {t('site.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-gray-900 dark:text-gray-100">
              {t('site.toolCategories')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/category/seo" className={`${styles.footerLink} text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400`}>
                  {t('categories.seo')}
                </Link>
              </li>
              <li>
                <Link to="/category/encode" className={`${styles.footerLink} text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400`}>
                  {t('categories.encode')}
                </Link>
              </li>
              <li>
                <Link to="/category/format" className={`${styles.footerLink} text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400`}>
                  {t('categories.format')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          <p className="flex items-center justify-center gap-1">
            © {currentYear} {siteConfig?.siteName || '站长工具箱'}. Made with{' '}
            <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by {siteConfig?.author || 'Developer'}
          </p>
        </div>
      </div>
    </footer>
  );
}
