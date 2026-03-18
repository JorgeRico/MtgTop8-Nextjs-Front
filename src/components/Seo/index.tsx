import { OpengraphType } from "@/types/opengraph";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_WEBSITE_URL || 'https://mtg-stats.vercel.app';

export const defaultOpenGraph: React.FC<OpengraphType> = ( title, description, url ): any => {
    return {
            title       : title,
            description : description,
            url         : url,
            type        : "website",
            images: [
                {
                    url    : `${baseUrl}/api/og?page=${url}`,
                    width  : 1200,
                    height : 600,
                },
            ],
        }
};