import Link from 'next/link';
import IconsImage from "@/components/Logo/Images/Icons";
import LogoImage from "@/components/Logo/Images/Image";
import endpoints from "@/types/server/endpoints";

const Logo: React.FC = () => {
    return (
        <Link href={endpoints.API_HOME}>
            <IconsImage />
            <br></br>
            <LogoImage />
        </Link>
    );
}

export default Logo;