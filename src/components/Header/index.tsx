import Logo from '@/components/Logo';
import Nav from '@/components/Header/Nav';
import SocialLinks from '@/components/Social/Header';
import Language from '@/components/Language/Language';

const Header = () => {
  return (
    <header className="w-full bg-surface-card shadow-header backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full width-1280 items-center justify-between gap-3 px-4 sm:px-8 lg:px-12">
        <Logo />
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <SocialLinks />
          <Language />
          <Nav />
        </div>
      </div>
    </header>
  );
};

export default Header;
