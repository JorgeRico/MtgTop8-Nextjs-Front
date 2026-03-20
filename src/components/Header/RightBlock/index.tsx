import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from "next/image";
import { HeaderRightType } from "@/types/schemas/header";

const HeaderRightBlock: React.FC<HeaderRightType> = ({ image, text, endpoint }) => {
    const t = useTranslations('header');

    return (
        <div className="pointer ml20 left">
            <Link href={endpoint}>
                <div className="left pt2">
                    <Image
                        className="send invertColor"
                        src={image}
                        height={20}
                        width={20}
                        alt={`${text} - ${t('mtg legacy')}`}
                        title={`${text} - ${t('mtg legacy')}`}
                        priority
                    />
                </div>
                <div className="left ml10 headerRight">
                    {text}
                </div>
            </Link>
        </div>
    );
}

export default HeaderRightBlock;