import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';
import { Link } from '@/components/Common/Link';
import { useConfig, useFeaturedTools } from '@/hooks/useConfig';
import { useI18n } from '@/hooks/useI18n';
import { getEnabledCategories } from '@/config/categories';
import * as LucideIcons from 'lucide-react';
import styles from './Home.module.css';

export default function Home() {
  const { siteConfig } = useConfig();
  const featuredTools = useFeaturedTools();
  const { t } = useI18n();
  const categories = getEnabledCategories();

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName.split('-').map((word: string) => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('')];
    return IconComponent || LucideIcons.Box;
  };

  return (
    <>
      <Helmet>
        <title>{siteConfig?.siteName || '站长工具箱'}</title>
        <meta name="description" content={siteConfig?.description || '免费在线站长工具集合'} />
        <meta name="keywords" content={siteConfig?.keywords.join(', ') || ''} />
      </Helmet>

      {/* Hero Section */}
      <section className={`${styles.hero} relative text-white p-12 mb-16`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {siteConfig?.siteName || '站长工具箱'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {siteConfig?.description || '免费在线站长工具集合，提供50+实用工具'}
          </p>
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {t('site.allTools')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: '快速高效', description: '无需安装，打开即用，快速完成任务' },
            { icon: Shield, title: '安全可靠', description: '纯前端处理，数据不上传服务器' },
            { icon: Sparkles, title: '完全免费', description: '所有工具永久免费，无任何限制' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${styles.featureCard} card p-6`}
            >
              <feature.icon className="w-12 h-12 text-primary-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      {featuredTools.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">{t('site.featuredTools')}</h2>
            <Link
              to="/tools"
              className="text-primary-500 hover:text-primary-600 flex items-center gap-1"
            >
              {t('site.allTools')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className={styles.toolGrid}>
            {featuredTools.slice(0, 6).map((tool, index) => {
              const Icon = getIcon(tool.icon);
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={tool.seo.path} className="block card p-6 h-full">
                    <Icon className="w-10 h-10 text-primary-500 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {t(`tools.${tool.id}`)}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {tool.seo.description}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* Categories */}
      <section>
        <h2 className="text-3xl font-bold mb-6">工具分类</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => {
            const Icon = getIcon(category.icon);
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/category/${category.id}`}
                  className="block card p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <Icon className="w-8 h-8 mx-auto mb-3 text-primary-500" />
                  <h3 className="font-semibold">{t(category.nameKey)}</h3>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}

