import { useParams } from 'react-router-dom';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { getToolById } from '@/config/toolsRegistry';
import { useToolConfig } from '@/hooks/useConfig';
import { Loading } from '@/components/Common/Loading';
import { Breadcrumb } from '@/components/Layout/Breadcrumb';
import { useI18n } from '@/hooks/useI18n';

export default function ToolPage() {
  const { toolId, category } = useParams<{ toolId: string; category: string }>();
  const toolMeta = toolId ? getToolById(toolId) : null;
  const toolConfig = useToolConfig(toolId || '');
  const { t } = useI18n();

  if (!toolMeta || !toolConfig) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Tool not found</h2>
      </div>
    );
  }

  const ToolComponent = toolMeta.component;

  return (
    <>
      <Helmet>
        <title>{toolConfig.seo.title}</title>
        <meta name="description" content={toolConfig.seo.description} />
        <meta name="keywords" content={toolConfig.seo.keywords.join(', ')} />
      </Helmet>

      <Breadcrumb
        items={[
          { label: t('site.tools'), path: '/tools' },
          { label: t(`categories.${category}`), path: `/category/${category}` },
          { label: t(`tools.${toolId}`) },
        ]}
      />

      <Suspense fallback={<Loading />}>
        <ToolComponent />
      </Suspense>
    </>
  );
}

