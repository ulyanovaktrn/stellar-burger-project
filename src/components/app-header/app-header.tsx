import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { UserSelectors } from '@selectors';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const name = useSelector(UserSelectors.selectUser)?.name;
  return <AppHeaderUI userName={name} />;
};
