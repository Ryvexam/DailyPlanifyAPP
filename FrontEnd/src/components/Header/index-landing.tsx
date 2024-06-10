import { Link } from 'react-router-dom';
import LogoIcon from '../../images/logo/SVG/logo_texte_droite_couleur.svg';
import DarkModeSwitcher from './DarkModeSwitcher';

const Header = (
) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">


        <Link className="block flex-shrink-0 " to="/">
          <img src={LogoIcon} alt="Logo" className="w-70 h-18" />
        </Link>


        <div className="hidden sm:block">
            <div className="relative">
            </div>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <Link
              to="/auth/signin"
              className="inline-flex rounded-full  py-1 px-2 font-medium text-black hover:border-primary hover:bg-primary hover:text-white dark:border-strokedark dark:text-white dark:hover:border-primary sm:py-3 sm:px-6"
            >
              Se connecter / S'inscrire
            </Link>
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
