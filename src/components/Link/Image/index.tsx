import Link from 'next/link';
import Image from "next/image";

type MyComponentProps = {
    url       : string;
    className : string;
    title     : string;
    img       : string;
    width     : number;
};

const LinkImage: React.FC<MyComponentProps> = ({url, className, title, img, width}) => {
    return (
        <Link href={url} className={className} target="_blank" rel="noopener noreferrer" title={title}>
            <Image
                src={img}
                height={width}
                width={width}
                alt={title}
                title={title}
                priority
            />
        </Link>
    );
}

export default LinkImage;