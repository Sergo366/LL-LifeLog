'use client';
import { Calendar } from '@/features/Calendar';
import React from 'react';
import { RichTextEditor } from '@/shared/components/RichTextEditor';
import { Footer } from '@/entities/Footer';

const DiaryPage = () => {
  return (
    <>
      <div className="container">
        <Calendar />
        <RichTextEditor />
      </div>
      <Footer />
    </>
  );
};

export default DiaryPage;
