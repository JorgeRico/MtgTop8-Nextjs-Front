import Link from 'next/link';
import Image from "next/image";
import { LinkType } from "@/types/link";

const LinkImage: React.FC<LinkType> = ({url, className, title, img, width, height}) => {
    return (
        <Link href={url} className={className} target="_blank" rel="noopener noreferrer" title={title}>
            <Image
                src    = {img}
                height = {height}
                width  = {width}
                alt    = {title}
                title  = {title}
                priority
            />
        </Link>
    );
}

export default LinkImage;