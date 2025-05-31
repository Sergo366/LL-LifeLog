'use client';
import React from 'react';
import { Button } from '@/shared/components/Button';
import classes from './styles.module.css';

export const Footer = () => {
  const handleClick = () => {
    console.log('click');
  };

  return (
    <div className={`${classes.footer}`}>
      <div className={classes.footerButtons}>
        <Button view={'primary'} size={'m'} onClick={handleClick}>
          Cancel
        </Button>
        <Button view={'primary'} size={'m'} onClick={handleClick}>
          Submit
        </Button>
      </div>
    </div>
  );
};
