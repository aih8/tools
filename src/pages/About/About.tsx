import { Helmet } from 'react-helmet-async';
import { useConfig } from '@/hooks/useConfig';

export default function About() {
  const { siteConfig } = useConfig();

  return (
    <>
      <Helmet>
        <title>{`About - ${siteConfig?.siteName || '站长工具箱'}`}</title>
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About</h1>
        
        <div className="card p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">关于本站</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {siteConfig?.siteName} 是一个免费的在线工具集合，提供各种常用的站长工具和开发者工具。
              所有工具都在浏览器端运行，不会上传您的数据到服务器，保证数据安全和隐私。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">特点</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li>完全免费，无需注册</li>
              <li>纯前端处理，数据不上传</li>
              <li>响应式设计，支持多种设备</li>
              <li>支持深色模式</li>
              <li>支持多语言</li>
              <li>PWA支持，可离线使用</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">联系我们</h2>
            <p className="text-gray-600 dark:text-gray-400">
              如有任何问题或建议，欢迎通过以下方式联系我们：
            </p>
            <div className="mt-4 space-y-2">
              {siteConfig?.social?.github && (
                <p>
                  GitHub: <a href={siteConfig.social.github} className="text-primary-500 hover:underline" target="_blank" rel="noopener noreferrer">
                    {siteConfig.social.github}
                  </a>
                </p>
              )}
              {siteConfig?.social?.twitter && (
                <p>
                  Twitter: <a href={siteConfig.social.twitter} className="text-primary-500 hover:underline" target="_blank" rel="noopener noreferrer">
                    {siteConfig.social.twitter}
                  </a>
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

