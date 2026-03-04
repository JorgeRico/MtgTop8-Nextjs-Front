import Link from 'next/link';
import IconsImage from "@/components/Logo/LogoIconsImage.tsx";
import LogoImage from "@/components/Logo/LogoImage.tsx";
import endpoints from "@/services/endpoints.tsx";

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