import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorActions } from '@slices';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      dispatch(
        BurgerConstructorActions.reorderIngredients({
          from: index,
          to: index + 1
        })
      );
    };
    const handleMoveUp = () => {
      dispatch(
        BurgerConstructorActions.reorderIngredients({
          from: index,
          to: index - 1
        })
      );
    };
    const handleClose = () => {
      dispatch(BurgerConstructorActions.removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
