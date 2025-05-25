import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { UserOrdersActions } from '@slices';
import { UserOrdersSelectors, UserSelectors } from '@selectors';
import { useSelector, useDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(UserOrdersSelectors.selectOrders);
  const isOrdersLoading = useSelector(UserOrdersSelectors.selectIsLoading);
  const isUserLoading = useSelector(UserSelectors.selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserOrdersActions.getOrdersThunk());
  }, []);

  return (
    <ProfileOrdersUI
      orders={orders}
      isLoading={isOrdersLoading || isUserLoading}
    />
  );
};
