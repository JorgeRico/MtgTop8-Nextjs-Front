export const baseUrl = process.env.NEXT_PUBLIC_BASE_WEBSITE_URL || 'https://mtg-stats.vercel.app';

export const defaultOg = {
    images: [
        {
            url: `${baseUrl}/og-image.jpg`,
            width: 1200,
            height: 630,
        },
    ],
};