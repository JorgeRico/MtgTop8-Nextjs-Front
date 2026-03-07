import "./module.css";
import CopyrightFooter from "@/components/Footer/CopyrightFooter";
import SocialFooter from "@/components/Footer/SocialFooter";

const Footer = () => {
    return (
        <footer>
            <SocialFooter></SocialFooter>
            <CopyrightFooter></CopyrightFooter>
        </footer>
    );
}

export default Footer;