import Link from 'next/link';
import Image from "next/image";
import { LinkType } from "@/types/schemas/website/link";

const LinkImage: React.FC<LinkType> = ({url, className, img, height, width}) => {
    return (
        <Link href={url} className={className}>
            <Image
                src    = {img}
                height = {height}
                width  = {width}
                alt    = "mtg legacy image"
                title  = "mtg legacy image"
                priority
            />
        </Link>
    );
}

export default LinkImage;