import classes from './styles.module.css';
import Logo from '../../../public/LifeLogLogo.svg'
import Link from 'next/link';
import { navigationList } from '@/entities/Header/const';
import { routes } from '@/shared/routes';
import { HeaderItem } from '@/entities/Header/HeaderItem';
import Image from 'next/image';

export const Header = () => {
  return (
    <header className={classes.wrapper}>
      <nav className={classes.navigation}>
        <Link href={routes.home}>
          <Image src={Logo} alt="logo" height={150} width={150} />
        </Link>
        <ul className={classes.navList}>
          {navigationList.map((nav) => (
            <HeaderItem key={nav.id} {...nav} />
          ))}
        </ul>
      </nav>
    </header>
  );
};
