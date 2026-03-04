import "./module.css";
import CopyrightFooter from "@/components/Footer/CopyrightFooter.tsx";
import SocialFooter from "@/components/Footer/SocialFooter.tsx";

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