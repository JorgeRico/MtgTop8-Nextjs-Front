// import { Link } from 'react-router-dom';
import StatsImage from "@/components/Logo/Images/Mtg";
import LogoImage from "@/components/Logo/Images/Logo";
// import endpoints from "/src/services/endpoints.jsx";
// import { useTranslation } from 'react-i18next';

export default function Logo() {
    // const { t } = useTranslation();
    
    return (
        <>
            {/* <Link to={endpoints.API_HOME}> */}
                <StatsImage />
                <br></br>
                <LogoImage />
            {/* </Link> */}
        </>
    );
}