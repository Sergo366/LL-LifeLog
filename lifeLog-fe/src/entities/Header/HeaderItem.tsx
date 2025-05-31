'use client';
import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import classes from './styles.module.css';
import { HeaderItemProps } from '@/entities/Header/const';

export const HeaderItem = (nav: HeaderItemProps) => {
  const pathname = usePathname();

  const navigationItem = classNames(classes.navigationItem, {
    [classes.active]: pathname === nav.href,
  });

  return (
    <li key={nav.id} className={navigationItem}>
      <Link href={nav.href}>{nav.name}</Link>
    </li>
  );
};
