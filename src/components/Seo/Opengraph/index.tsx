import type { Metadata } from 'next';
import { baseUrl } from "@/types/baseUrl";

export function defaultOpenGraph( title: string, description: string, url: string ): NonNullable<Metadata['openGraph']> {
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