import React, { FC } from 'react';
import classes from './styles.module.css';
import cn from 'classnames';
import { sizeValues, viewValues } from '@/shared/components/Button/const';

type ButtonProps = {
  onClick: () => void;
  view?: keyof typeof viewValues;
  size?: keyof typeof sizeValues;
  children: React.ReactNode;
};

export const Button: FC<ButtonProps> = ({ onClick, children, view, size = 's' }) => {
  const buttonClass = cn(classes.buttonWrapper, {
    [classes.primary]: view === 'primary',
    [classes.sizeS]: size === 's',
    [classes.sizeM]: size === 'm',
    [classes.sizeL]: size === 'l',
    [classes.sizeXL]: size === 'xl',
  });

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};
