import { Helmet } from 'react-helmet-async';
import { Link } from '@/components/Common/Link';
import { useEnabledTools } from '@/hooks/useConfig';
import { useI18n } from '@/hooks/useI18n';
import * as LucideIcons from 'lucide-react';

export default function ToolsListing() {
  const tools = useEnabledTools();
  const { t } = useI18n();

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName.split('-').map((word: string) => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('')];
    return IconComponent || LucideIcons.Box;
  };

  return (
    <>
      <Helmet>
        <title>{t('site.tools')} - 站长工具箱</title>
      </Helmet>

      <h1 className="text-4xl font-bold mb-8">{t('site.allTools')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = getIcon(tool.icon);
          return (
            <Link
              key={tool.id}
              to={tool.seo.path}
              className="card p-6 hover:shadow-lg transition-shadow"
            >
              <Icon className="w-10 h-10 text-primary-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t(`tools.${tool.id}`)}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {tool.seo.description}
              </p>
            </Link>
          );
        })}
      </div>
    </>
  );
}

