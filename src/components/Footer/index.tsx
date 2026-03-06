import "./module.css";
import CopyrightFooter from "@/components/Footer/CopyrightFooter";
import SocialFooter from "@/components/Footer/SocialFooter";

export default function Footer() {
    return (
        <>
            <footer>
                <SocialFooter></SocialFooter>
                <CopyrightFooter></CopyrightFooter>
            </footer>
        </>
    );
}