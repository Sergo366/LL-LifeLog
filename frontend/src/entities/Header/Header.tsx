import classes from './styles.module.css';
import { Logo } from './Logo';
import Link from 'next/link';
import { navigationList } from '@/entities/Header/const';
import { routes } from '@/shared/routes';
import { HeaderItem } from '@/entities/Header/HeaderItem';

export const Header = () => {
  return (
    <header className={classes.wrapper}>
      <nav className={classes.navigation}>
        <Link href={routes.home}>
          <Logo />
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
