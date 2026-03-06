import Link from 'next/link';
import IconsImage from "@/components/Logo/LogoIconsImage";
import LogoImage from "@/components/Logo/LogoImage";
import endpoints from "@/services/endpoints";

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