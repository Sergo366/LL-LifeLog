import { routes } from '@/shared/routes';

export type HeaderItemProps = {
  id: string;
  name: string;
  href: string;
};

export const navigationList: HeaderItemProps[] = [
  { id: '0', name: 'Diary', href: routes.diary },
  { id: '1', name: 'Plans', href: routes.plans },
  { id: '2', name: 'Goals', href: routes.goals },
  { id: '3', name: 'Home page', href: routes.home },
];
