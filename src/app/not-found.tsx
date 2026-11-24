import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { seo_tags } from '@/components/Seo';
import { baseUrl } from '@/types/server/baseUrl';
import NotFoundComponent from '@/app/_not-found';

interface MetadataProps {
  params: Promise<{locale: string}>;
}

export async function generateMetadata({params}: MetadataProps): Promise<Metadata> {
    const {locale}    = await params;
    const t           = await getTranslations({locale, namespace: 'not-found'});
    const url         = `${baseUrl}/not-found`;
    const title       = t('title');
    const description = t('description');

    return seo_tags(title, description, url);
}

const NotFound = () => {
    return (
        <NotFoundComponent></NotFoundComponent>
    );
}

export default NotFound;
