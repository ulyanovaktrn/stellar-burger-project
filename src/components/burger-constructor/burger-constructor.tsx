import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  BurgerConstructorSelectors,
  OrdersSelectors,
  UserSelectors
} from '@selectors';
import { BurgerConstructorActions, OrdersActions } from '@slices';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(
    BurgerConstructorSelectors.selectIngredients
  );

  const orderRequest = useSelector(OrdersSelectors.selectIsLoading);
  const orderModalData = useSelector(OrdersSelectors.selectNewOrder);
  const user = useSelector(UserSelectors.selectUser);
  const isAuthChecked = useSelector(UserSelectors.selectIsAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!user || !isAuthChecked) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;

    const order = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];
    dispatch(OrdersActions.getOrderBurgerThunk(order)).finally(() => {
      dispatch(BurgerConstructorActions.clearIngredients());
    });
  };
  const closeOrderModal = () => {
    dispatch(OrdersActions.clearNewOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
