import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
    export const runtime = 'edge';


export async function GET(req: Request) {
    const baseUrl  = process.env.NEXT_PUBLIC_BASE_WEBSITE_URL || 'https://mtg-stats.vercel.app';
    const imageUrl = `${baseUrl}/og-image.jpg`;

    const { searchParams } = new URL(req.url);
    const title            = searchParams.get('page') || baseUrl;

    return new ImageResponse(
        (
            <div style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "#242f40",
                    padding: "40px"
                }}
            >
                <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img
                        alt="Brand Logo"
                        src={imageUrl}
                        style={{
                            width: 200,
                            height: 200,
                            borderRadius: "10px",
                        }}
                    />
                </div>
                <div style={{
                        padding: "40px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}
                >
                    <div style={{
                            display: "flex",
                            fontSize: "32px",
                            fontWeight: "900",
                            color: "#cccfec",
                            marginBottom: '20px',
                        }}
                    >
                        MTG Legacy Stats - Eternal Català
                    </div>
                    <div style={{
                            display: "flex",
                            fontSize: "24px",
                            fontWeight: "900",
                            color: "#cccfec",
                            marginBottom: '40px',
                            width: '90%'
                        }}
                    >
                        Magic: The Gathering in Catalonia, leagues, tournaments, and competitive events for players of all levels.
                    </div>
                    <div style={{
                            display: "flex",
                            fontSize: "18px",
                            fontWeight: "900",
                            color: "#cccfec",
                        }}
                    >
                        {title}
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 600,
        },
    );
}