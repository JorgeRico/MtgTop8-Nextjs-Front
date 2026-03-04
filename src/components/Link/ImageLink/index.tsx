import Link from 'next/link';
import Image from "next/image";

type MyComponentProps = {
    url       : string;
    className : string;
    img       : string;
};

const LinkImage: React.FC<MyComponentProps> = ({url, className, img}) => {

    return (
        <Link href={url} className={className}>
            <Image
                src={img}
                // height={height}
                // width={width}
                alt="mtg legacy image"
                title="mtg legacy image"
                priority
            />
        </Link>
    );
}

export default LinkImage;