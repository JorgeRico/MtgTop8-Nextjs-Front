import Logo from "@/components/Logo";
import SocialLinks from "@/components/Header/Social";
import Language from "@/components/Language/Language";

const Header = () => {
  return (
    <header
      className="w-full bg-[rgba(11,15,20,0.85)] shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-[24px]"
    >
      <div className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between gap-3 px-4 sm:px-8 lg:px-12">
        <Logo />
        <div className="flex shrink-0 items-center gap-4">
          <SocialLinks />
          <Language />
        </div>
      </div>
    </header>
  );
};

export default Header;