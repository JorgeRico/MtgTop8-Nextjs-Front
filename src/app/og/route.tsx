import { ImageResponse } from 'next/og'
import Image from "next/image";

export async function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 80,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                        src    = '/og-image.jpg'
                        height = {200}
                        width  = {200}
                        alt    = "MTG Stats- Eternal català"
                        title  = "MTG Stats- Eternal català"
                        priority
                    />
            </div>
        ),
        {
            width: 200,
            height: 200,
        }
    )
}