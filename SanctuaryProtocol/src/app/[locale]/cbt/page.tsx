"use client";

import { useTranslations } from "next-intl";

export default function CBTPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-3xl font-serif mb-4">{t('cbt.title')}</h1>
        <p className="text-muted mb-8">{t('cbt.subtitle')}</p>
        
        <div className="bg-accent/10 px-6 py-4 rounded-lg mb-8">
          <p className="text-accent font-medium">🚧 {t('cbt.comingSoon')}</p>
        </div>
        
        <p className="text-small text-muted">
          {t('cbt.description')}
        </p>
      </div>
    </div>
  );
}
