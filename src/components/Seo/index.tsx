import type { Metadata } from 'next';
import { defaultOpenGraph } from '@/components/Seo/Opengraph';

export function seo_tags( title: string, description: string, url: string ): NonNullable<Metadata> {
    return {
        title       : title,
        description : description,
        openGraph   : defaultOpenGraph(title, description, url),
    }
};