import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserSelectors } from '@selectors';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { ProtectedRouteProps } from './type';

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  withoutAuth
}) => {
  const isAuth = useSelector(UserSelectors.selectIsAuth);
  const user = useSelector(UserSelectors.selectUser);
  const location = useLocation();
  //console.log(`FOR AUTH ${forAuth}`);
  if (!isAuth) return <Preloader />;

  if (!withoutAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (withoutAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return (
      <Navigate
        replace
        to={from}
        state={{ background: from?.state?.background }}
      />
    );
  }
  return children;
};
