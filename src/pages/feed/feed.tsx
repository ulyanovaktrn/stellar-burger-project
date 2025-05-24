import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { FeedActions } from '@slices';
import { FeedSelectors } from '@selectors';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(FeedSelectors.selectOrders);
  const isLoading = useSelector(FeedSelectors.selectIsLoading);
  const dispatch = useDispatch();

  const handleGetFeeds = () => {
    dispatch(FeedActions.getFeedsThunk());
  };

  useEffect(() => {
    handleGetFeeds();
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
