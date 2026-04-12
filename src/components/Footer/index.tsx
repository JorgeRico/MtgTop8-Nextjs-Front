import "./module.css";
import CopyrightFooter from "@/components/Footer/Copyright";
import SocialFooter from "@/components/Footer/Social";

const Footer = () => {
    return (
        <footer>
            <SocialFooter></SocialFooter>
            <CopyrightFooter></CopyrightFooter>
        </footer>
    );
}

export default Footer;